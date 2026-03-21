import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { modulesTable, lessonsTable, questionsTable, userLessonProgressTable } from "@workspace/db/schema";
import { eq, count, and } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  const userId = (req as any).userId;

  try {
    const modules = await db.select().from(modulesTable).orderBy(modulesTable.orderIndex);
    const lessons = await db.select().from(lessonsTable).orderBy(lessonsTable.orderIndex);

    let completedLessonIds = new Set<number>();
    if (userId) {
      const completed = await db
        .select({ lessonId: userLessonProgressTable.lessonId })
        .from(userLessonProgressTable)
        .where(and(eq(userLessonProgressTable.userId, userId), eq(userLessonProgressTable.completed, true)));
      completedLessonIds = new Set(completed.map((r) => r.lessonId));
    }

    const result = modules.map((mod, idx) => {
      const modLessons = lessons.filter((l) => l.moduleId === mod.id);
      const completedCount = modLessons.filter((l) => completedLessonIds.has(l.id)).length;
      const totalLessons = modLessons.length;

      let status: "locked" | "active" | "completed" = "locked";
      if (completedCount === totalLessons && totalLessons > 0) {
        status = "completed";
      } else if (idx === 0) {
        status = "active";
      } else {
        const prevMod = modules[idx - 1];
        const prevLessons = lessons.filter((l) => l.moduleId === prevMod.id);
        const prevCompleted = prevLessons.filter((l) => completedLessonIds.has(l.id)).length;
        if (prevCompleted === prevLessons.length && prevLessons.length > 0) {
          status = "active";
        }
      }

      return {
        id: mod.id,
        title: mod.title,
        description: mod.description,
        icon: mod.icon,
        orderIndex: mod.orderIndex,
        status,
        totalLessons,
        completedLessons: completedCount,
        xpReward: mod.xpReward,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Error in GET /modules:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:moduleId", async (req, res) => {
  const userId = (req as any).userId;
  const moduleId = parseInt(req.params.moduleId);

  try {
    const [mod] = await db.select().from(modulesTable).where(eq(modulesTable.id, moduleId));
    if (!mod) {
      res.status(404).json({ error: "Module not found" });
      return;
    }

    const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.moduleId, moduleId)).orderBy(lessonsTable.orderIndex);
    const [qCount] = await db.select({ count: count() }).from(questionsTable);

    let completedLessonIds = new Set<number>();
    if (userId) {
      const completed = await db
        .select({ lessonId: userLessonProgressTable.lessonId })
        .from(userLessonProgressTable)
        .where(and(eq(userLessonProgressTable.userId, userId), eq(userLessonProgressTable.completed, true)));
      completedLessonIds = new Set(completed.map((r) => r.lessonId));
    }

    const completedCount = lessons.filter((l) => completedLessonIds.has(l.id)).length;

    let moduleStatus: "locked" | "active" | "completed" = "active";
    if (completedCount === lessons.length && lessons.length > 0) moduleStatus = "completed";

    const mappedLessons = lessons.map((l, idx) => {
      let status: "locked" | "active" | "completed" = "locked";
      if (completedLessonIds.has(l.id)) {
        status = "completed";
      } else if (idx === 0 || completedLessonIds.has(lessons[idx - 1].id)) {
        status = "active";
      }

      return {
        id: l.id,
        moduleId: l.moduleId,
        title: l.title,
        description: l.description,
        orderIndex: l.orderIndex,
        status,
        xpReward: l.xpReward,
        lessonType: l.lessonType as "quiz" | "puzzle" | "reading",
        totalQuestions: 5,
      };
    });

    res.json({
      id: mod.id,
      title: mod.title,
      description: mod.description,
      icon: mod.icon,
      orderIndex: mod.orderIndex,
      status: moduleStatus,
      totalLessons: lessons.length,
      completedLessons: completedCount,
      xpReward: mod.xpReward,
      lessons: mappedLessons,
    });
  } catch (err) {
    console.error("Error in GET /modules/:id:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
