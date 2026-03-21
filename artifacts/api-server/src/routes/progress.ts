import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  usersTable, userLessonProgressTable, lessonsTable,
  activityTable, badgesTable, userBadgesTable
} from "@workspace/db/schema";
import { eq, and, count } from "drizzle-orm";

const router: IRouter = Router();

function xpToLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

router.post("/complete-lesson", async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const { lessonId, score, totalQuestions } = req.body;

  try {
    const [lesson] = await db.select().from(lessonsTable).where(eq(lessonsTable.id, lessonId));
    if (!lesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    const accuracy = totalQuestions > 0 ? score / totalQuestions : 1;
    const xpEarned = Math.round(lesson.xpReward * accuracy);
    const oldLevel = xpToLevel(user.totalXp);
    const newTotalXp = user.totalXp + xpEarned;
    const newLevel = xpToLevel(newTotalXp);
    const leveledUp = newLevel > oldLevel;

    const today = new Date().toISOString().split("T")[0];
    let newStreak = user.streak;
    if (user.lastLoginDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      newStreak = user.lastLoginDate === yesterday ? user.streak + 1 : 1;
    }

    await db.update(usersTable).set({
      totalXp: newTotalXp,
      level: newLevel,
      streak: newStreak,
      lastLoginDate: today,
    }).where(eq(usersTable.id, userId));

    const existing = await db
      .select()
      .from(userLessonProgressTable)
      .where(and(eq(userLessonProgressTable.userId, userId), eq(userLessonProgressTable.lessonId, lessonId)));

    if (existing.length === 0) {
      await db.insert(userLessonProgressTable).values({
        userId,
        lessonId,
        completed: true,
        score,
        totalQuestions,
        completedAt: new Date(),
      });
    } else {
      await db.update(userLessonProgressTable).set({
        completed: true, score, totalQuestions, completedAt: new Date(),
      }).where(and(eq(userLessonProgressTable.userId, userId), eq(userLessonProgressTable.lessonId, lessonId)));
    }

    await db.insert(activityTable).values({
      userId,
      type: "lesson_complete",
      description: `Completed lesson: ${lesson.title}`,
      xpEarned,
    });

    if (leveledUp) {
      await db.insert(activityTable).values({
        userId,
        type: "level_up",
        description: `Reached Level ${newLevel}! 🎉`,
        xpEarned: 0,
      });
    }

    const allBadges = await db.select().from(badgesTable);
    const earnedBadges = await db.select({ badgeId: userBadgesTable.badgeId }).from(userBadgesTable).where(eq(userBadgesTable.userId, userId));
    const earnedBadgeIds = new Set(earnedBadges.map((b) => b.badgeId));

    const [lessonCountRow] = await db
      .select({ count: count() })
      .from(userLessonProgressTable)
      .where(and(eq(userLessonProgressTable.userId, userId), eq(userLessonProgressTable.completed, true)));
    const lessonCount = Number(lessonCountRow.count);

    const newBadgesEarned: Array<{ id: number; name: string; description: string; icon: string; earned: boolean; earnedAt: string | null }> = [];

    for (const badge of allBadges) {
      if (earnedBadgeIds.has(badge.id)) continue;
      let shouldEarn = false;

      if (badge.requirement === "first_lesson" && lessonCount >= 1) shouldEarn = true;
      if (badge.requirement === "lessons_5" && lessonCount >= 5) shouldEarn = true;
      if (badge.requirement === "lessons_10" && lessonCount >= 10) shouldEarn = true;
      if (badge.requirement === "level_5" && newLevel >= 5) shouldEarn = true;
      if (badge.requirement === "level_10" && newLevel >= 10) shouldEarn = true;
      if (badge.requirement === "streak_7" && newStreak >= 7) shouldEarn = true;

      if (shouldEarn) {
        const now = new Date();
        await db.insert(userBadgesTable).values({ userId, badgeId: badge.id, earnedAt: now });
        await db.insert(activityTable).values({
          userId,
          type: "badge_earned",
          description: `Earned badge: ${badge.name} ${badge.icon}`,
          xpEarned: 0,
        });
        newBadgesEarned.push({
          id: badge.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          earned: true,
          earnedAt: now.toISOString(),
        });
      }
    }

    res.json({
      xpEarned,
      newTotalXp,
      newLevel,
      leveledUp,
      badgesEarned: newBadgesEarned,
      streakUpdated: newStreak !== user.streak,
    });
  } catch (err) {
    console.error("Error in POST /progress/complete-lesson:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
