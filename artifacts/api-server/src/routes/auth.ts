import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/me", async (req, res) => {
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

    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email ?? undefined,
      avatarUrl: user.avatarUrl ?? undefined,
      createdAt: user.createdAt.toISOString(),
    });
  } catch (err) {
    console.error("Error in /auth/me:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/login", (req, res) => {
  const domain = process.env["REPLIT_DEV_DOMAIN"] || req.hostname;
  res.redirect(`https://replit.com/auth_with_repl_site?domain=${domain}`);
});

router.get("/logout", (_req, res) => {
  res.redirect("/");
});

export default router;
