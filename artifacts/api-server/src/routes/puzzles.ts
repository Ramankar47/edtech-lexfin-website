import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  puzzlesTable, userPuzzleProgressTable, usersTable, activityTable
} from "@workspace/db/schema";
import { eq, and, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  const userId = (req as any).userId;

  try {
    const puzzles = await db.select().from(puzzlesTable).orderBy(puzzlesTable.orderIndex);

    let completedPuzzleIds = new Set<number>();
    if (userId) {
      const completed = await db
        .select({ puzzleId: userPuzzleProgressTable.puzzleId })
        .from(userPuzzleProgressTable)
        .where(and(eq(userPuzzleProgressTable.userId, userId), eq(userPuzzleProgressTable.completed, true)));
      completedPuzzleIds = new Set(completed.map((r) => r.puzzleId));
    }

    const recentIds = puzzles.slice(-2).map((p) => p.id);

    const result = puzzles.map((p) => {
      let parsedContent = null;
      try {
        parsedContent = p.content ? JSON.parse(p.content) : null;
      } catch (e) {
        console.error(`Failed to parse content for puzzle ${p.id}:`, e);
      }

      return {
        id: p.id,
        title: p.title,
        description: p.description,
        difficulty: p.difficulty as "easy" | "medium" | "hard",
        puzzleType: p.puzzleType,
        xpReward: p.xpReward,
        isNew: recentIds.includes(p.id) && !completedPuzzleIds.has(p.id),
        isCompleted: completedPuzzleIds.has(p.id),
        content: parsedContent,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Error in GET /puzzles:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:puzzleId/submit", async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const puzzleId = parseInt(req.params.puzzleId);
  const { answer } = req.body;

  try {
    const [puzzle] = await db.select().from(puzzlesTable).where(eq(puzzlesTable.id, puzzleId));
    if (!puzzle) {
      res.status(404).json({ error: "Puzzle not found" });
      return;
    }

    const correct = answer.trim().toLowerCase() === puzzle.correctAnswer.trim().toLowerCase();
    const xpEarned = correct ? puzzle.xpReward : Math.round(puzzle.xpReward * 0.1);

    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
    const newTotalXp = (user?.totalXp ?? 0) + xpEarned;

    await db.update(usersTable).set({ totalXp: newTotalXp }).where(eq(usersTable.id, userId));

    const existing = await db
      .select()
      .from(userPuzzleProgressTable)
      .where(and(eq(userPuzzleProgressTable.userId, userId), eq(userPuzzleProgressTable.puzzleId, puzzleId)));

    if (existing.length === 0) {
      await db.insert(userPuzzleProgressTable).values({
        userId,
        puzzleId,
        completed: correct,
        completedAt: correct ? new Date() : null,
      });
    } else if (correct) {
      await db.update(userPuzzleProgressTable).set({
        completed: true, completedAt: new Date(),
      }).where(and(eq(userPuzzleProgressTable.userId, userId), eq(userPuzzleProgressTable.puzzleId, puzzleId)));
    }

    if (correct) {
      await db.insert(activityTable).values({
        userId,
        type: "puzzle_solved",
        description: `Solved puzzle: ${puzzle.title}`,
        xpEarned,
      });
    }

    res.json({
      correct,
      xpEarned,
      explanation: puzzle.explanation,
      newTotalXp,
    });
  } catch (err) {
    console.error("Error in POST /puzzles/:id/submit:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
