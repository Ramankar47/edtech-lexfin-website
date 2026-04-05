import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import router from "./routes";

const app: Express = express();

app.use(cors({
  credentials: true,
  origin: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(async (req: Request, _res: Response, next: NextFunction) => {
  const replUserId = req.headers["x-replit-user-id"];
  const replUserName = req.headers["x-replit-user-name"];
  const replUserProfileImage = req.headers["x-replit-user-profile-image"];

  if (replUserId && replUserName && typeof replUserId === "string" && typeof replUserName === "string") {
    (req as any).userId = replUserId;
    (req as any).replitUser = {
      id: replUserId,
      username: replUserName,
      name: replUserName,
      profileImage: typeof replUserProfileImage === "string" ? replUserProfileImage : null,
    };

    try {
      const { db } = await import("@workspace/db");
      const { usersTable } = await import("@workspace/db/schema");
      const { eq } = await import("drizzle-orm");

      const [existing] = await db.select().from(usersTable).where(eq(usersTable.id, replUserId));
      if (!existing) {
        await db.insert(usersTable).values({
          id: replUserId,
          username: replUserName,
          name: replUserName,
          email: null,
          avatarUrl: typeof replUserProfileImage === "string" ? replUserProfileImage : null,
          totalXp: 0,
          level: 1,
          streak: 0,
          lastLoginDate: new Date().toISOString().split("T")[0],
        });
      }
    } catch (err) {
      console.error("Error upserting user:", err);
    }
  }

  next();
});

app.use("/api", router);

// Serve blog photos under /api/blog-photos so it shares the same proxy routing as API calls
app.use("/api/blog-photos", express.static(path.resolve(process.cwd(), "../../content/blogs/photo"), {
  maxAge: "1d",
  fallthrough: true,
}));

// Static file serving under /api/content
app.use("/api/content", express.static(path.resolve(process.cwd(), "../../content"), {
  maxAge: "1d",
  fallthrough: true,
}));

export default app;
