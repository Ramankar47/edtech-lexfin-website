import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  usersTable, userLessonProgressTable, userPuzzleProgressTable,
  badgesTable, userBadgesTable
} from "@workspace/db/schema";
import { eq, count, and, sql } from "drizzle-orm";

const router: IRouter = Router();

function xpToLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

function xpForNextLevel(xp: number): number {
  const level = xpToLevel(xp);
  return level * 100;
}

router.get("/stats", async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    const [puzzleCount] = await db
      .select({ count: count() })
      .from(userPuzzleProgressTable)
      .where(and(eq(userPuzzleProgressTable.userId, userId), eq(userPuzzleProgressTable.completed, true)));

    const [lessonCount] = await db
      .select({ count: count() })
      .from(userLessonProgressTable)
      .where(and(eq(userLessonProgressTable.userId, userId), eq(userLessonProgressTable.completed, true)));

    const level = xpToLevel(user.totalXp);
    const xpToNext = xpForNextLevel(user.totalXp);
    const xpProgress = user.totalXp - (level - 1) * 100;

    res.json({
      totalXp: user.totalXp,
      level,
      streak: user.streak,
      puzzlesSolved: Number(puzzleCount.count),
      lessonsCompleted: Number(lessonCount.count),
      xpToNextLevel: 100,
      xpProgress,
    });
  } catch (err) {
    console.error("Error in /user/stats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
