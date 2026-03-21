import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { activityTable } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const items = await db
      .select()
      .from(activityTable)
      .where(eq(activityTable.userId, userId))
      .orderBy(desc(activityTable.createdAt))
      .limit(20);

    const result = items.map((item) => ({
      id: item.id,
      type: item.type as "lesson_complete" | "puzzle_solved" | "badge_earned" | "level_up" | "streak",
      description: item.description,
      xpEarned: item.xpEarned,
      createdAt: item.createdAt.toISOString(),
    }));

    res.json(result);
  } catch (err) {
    console.error("Error in GET /activity:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
