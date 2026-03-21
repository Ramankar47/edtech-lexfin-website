import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { lessonsTable, questionsTable, userLessonProgressTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";

const router: IRouter = Router();

router.get("/:lessonId", async (req, res) => {
  const userId = (req as any).userId;
  const lessonId = parseInt(req.params.lessonId);

  try {
    const [lesson] = await db.select().from(lessonsTable).where(eq(lessonsTable.id, lessonId));
    if (!lesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    const questions = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.lessonId, lessonId))
      .orderBy(questionsTable.orderIndex);

    let status: "locked" | "active" | "completed" = "active";
    if (userId) {
      const [progress] = await db
        .select()
        .from(userLessonProgressTable)
        .where(and(eq(userLessonProgressTable.userId, userId), eq(userLessonProgressTable.lessonId, lessonId)));
      if (progress?.completed) status = "completed";
    }

    const mappedQuestions = questions.map((q) => ({
      id: q.id,
      lessonId: q.lessonId,
      questionText: q.questionText,
      questionType: q.questionType as "multiple_choice" | "true_false" | "fill_blank",
      options: q.options ? JSON.parse(q.options) : null,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      orderIndex: q.orderIndex,
    }));

    res.json({
      id: lesson.id,
      moduleId: lesson.moduleId,
      title: lesson.title,
      description: lesson.description,
      orderIndex: lesson.orderIndex,
      status,
      xpReward: lesson.xpReward,
      lessonType: lesson.lessonType as "quiz" | "puzzle" | "reading",
      totalQuestions: questions.length,
      questions: mappedQuestions,
    });
  } catch (err) {
    console.error("Error in GET /lessons/:id:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
