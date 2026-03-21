import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { badgesTable, userBadgesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  const userId = (req as any).userId;

  try {
    const allBadges = await db.select().from(badgesTable).orderBy(badgesTable.id);

    let earnedMap = new Map<number, Date>();
    if (userId) {
      const earned = await db
        .select()
        .from(userBadgesTable)
        .where(eq(userBadgesTable.userId, userId));
      earnedMap = new Map(earned.map((e) => [e.badgeId, e.earnedAt]));
    }

    const result = allBadges.map((b) => {
      const earnedAt = earnedMap.get(b.id);
      return {
        id: b.id,
        name: b.name,
        description: b.description,
        icon: b.icon,
        earned: earnedMap.has(b.id),
        earnedAt: earnedAt ? earnedAt.toISOString() : null,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Error in GET /badges:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
