import { Router, type IRouter } from "express";
import { createRequire } from "module";
import path from "path";
import fs from "fs";
import { db } from "@workspace/db";
import {
  usersTable,
  userLessonProgressTable,
  lessonsTable,
  activityTable,
} from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

const router: IRouter = Router();

const CONTENT_DIR = path.resolve(process.cwd(), "../../content");

// Generic Course/Module media handler for Course placeholders (matches Course1/Module1/Unit1/...)
router.get("/:cId/:mId/:uId/:type/media", (req, res) => {
  const { cId, mId, uId, type } = req.params;
  
  // Clean prefixes if present (Course1 -> 1, Module1 -> 1, Unit1 -> 1)
  const courseId = cId.replace(/^Course/i, "");
  const moduleId = mId.replace(/^Module/i, "");
  const unitNumber = uId.replace(/^Unit/i, "");
  
  const isAudio = type.toLowerCase() === "audios" || type.toLowerCase() === "audio";
  const subFolder = isAudio ? "audio" : "video";
  const dirPath = path.join(CONTENT_DIR, `Course${courseId}`, `Module${moduleId}`, subFolder);

  if (!fs.existsSync(dirPath)) {
    console.log(`Media folder not found: ${dirPath}`);
    res.status(404).end();
    return;
  }

  try {
    const files = fs.readdirSync(dirPath);
    // Find matching file
    let targetFile = null;
    if (isAudio) {
      // Audio: Look for `lesson[unitNumber](audio)` pattern first
      targetFile = files.find(f => 
        f.toLowerCase().startsWith(`lesson${unitNumber}(audio)`) && 
        ['.mp3', '.wav', '.m4a', '.aac'].includes(path.extname(f).toLowerCase())
      );
    } else {
      // Video: Look for any video file in the folder (since they named it 'The Foundation')
      targetFile = files.find(f => 
        ['.mp4', '.m4v', '.webm', '.ogg'].includes(path.extname(f).toLowerCase())
      );
    }

    if (!targetFile) {
      // Fallback: Pick the first file in the directory that is not hidden
      targetFile = files.find(f => !f.startsWith('.'));
    }

    if (!targetFile) {
      res.status(404).end();
      return;
    }

    res.sendFile(path.join(dirPath, targetFile));
  } catch (err) {
    console.error(`Media serve error:`, err);
    res.status(500).end();
  }
});

const MODULE_DIRS: Record<number, string> = {
  1: "module-1-consumer-protection-law",
  2: "module-2-income-tax-basics",
  3: "module-3-securities-capital-markets",
  4: "module-4-contract-law-fundamentals",
  5: "module-5-banking-rbi-regulations",
  6: "module-6-property-real-estate-law",
  7: "module-7-gst-indirect-taxes",
  8: "module-8-startup-company-law",
  9: "module-9-insurance-laws",
  10: "module-10-digital-finance-cyber-laws",
};

function readSheet<T = Record<string, any>>(
  filePath: string,
  sheetName: string,
): T[] {
  try {
    const wb = XLSX.readFile(filePath);
    const ws = wb.Sheets[sheetName];
    if (!ws) return [];
    return XLSX.utils.sheet_to_json(ws) as T[];
  } catch (err) {
    console.error(`XLSX read error [${sheetName}] ${filePath}:`, err);
    return [];
  }
}

function getModuleDir(moduleId: number): string | null {
  const dirName = MODULE_DIRS[moduleId];
  if (!dirName) return null;
  const fullPath = path.join(CONTENT_DIR, dirName);
  return fs.existsSync(fullPath) ? fullPath : null;
}

// GET /api/content/studymaterial/:category — list files
router.get("/studymaterial/:category", (req, res) => {
  const category = req.params.category;
  const dirPath = path.join(process.cwd(), "../../content/StudyMaterial", category);
  
  if (!fs.existsSync(dirPath)) {
    res.json([]);
    return;
  }
  
  try {
    const files = fs.readdirSync(dirPath);
    const result = files
      .filter(f => !f.startsWith('.'))
      .map(file => {
        const ext = path.extname(file).toLowerCase();
        let type = 'other';
        if (['.mp4', '.webm', '.ogg', '.m4v'].includes(ext)) {
          type = 'video';
        } else if (['.mp3', '.wav', '.m4a', '.aac'].includes(ext)) {
          type = 'audio';
        } else if (['.docx', '.pdf', '.pptx', '.xlsx', '.txt'].includes(ext)) {
          type = 'doc';
        }
        return {
          name: file,
          url: `/api/content/studymaterial/${category}/${encodeURIComponent(file)}`,
          type
        };
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to read directory" });
  }
});

// GET /api/content/studymaterial/:category/:filename — serve the file
router.get("/studymaterial/:category/:filename", (req, res) => {
  const { category, filename } = req.params;
  const filePath = path.join(process.cwd(), "../../content/StudyMaterial", category, filename);
  
  if (!fs.existsSync(filePath)) {
    res.status(404).end();
    return;
  }
  res.sendFile(filePath);
});

// GET /api/content/home/:category — list files in the category folder
router.get("/home/:category", (req, res) => {
  const category = req.params.category;
  const dirPath = path.join(process.cwd(), "../../content/home", category);
  
  if (!fs.existsSync(dirPath)) {
    res.json([]);
    return;
  }
  
  try {
    const files = fs.readdirSync(dirPath);
    const result = files
      .filter(f => !f.startsWith('.'))
      .map(file => {
        const ext = path.extname(file).toLowerCase();
        let type = 'other';
        if (['.mp4', '.webm', '.ogg', '.m4v'].includes(ext)) {
          type = 'video';
        } else if (['.mp3', '.wav', '.m4a', '.aac'].includes(ext)) {
          type = 'audio';
        } else if (['.docx', '.pdf', '.pptx', '.xlsx', '.txt'].includes(ext)) {
          type = 'doc';
        }
        return {
          name: file,
          url: `/api/content/home/${category}/${encodeURIComponent(file)}`,
          type
        };
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to read directory" });
  }
});

// GET /api/content/home/:category/:filename — serve the file
router.get("/home/:category/:filename", (req, res) => {
  const { category, filename } = req.params;
  const filePath = path.join(process.cwd(), "../../content/home", category, filename);
  
  if (!fs.existsSync(filePath)) {
    res.status(404).end();
    return;
  }
  res.sendFile(filePath);
});

// GET /api/content/:moduleId — fetch Excel-driven content
router.get("/:moduleId", async (req, res) => {
  const moduleId = parseInt(req.params.moduleId);
  const moduleDir = getModuleDir(moduleId);

  if (!moduleDir) {
    res.status(404).json({ error: "Module content not found" });
    return;
  }

  const xlsxPath = path.join(moduleDir, "content.xlsx");
  if (!fs.existsSync(xlsxPath)) {
    res.status(404).json({ error: "Content Excel file not found" });
    return;
  }

  const info = readSheet(xlsxPath, "Info");
  const content = readSheet(xlsxPath, "Content");
  const quiz1 = readSheet(xlsxPath, "Quiz1");
  const quiz2 = readSheet(xlsxPath, "Quiz2");
  const puzzle = readSheet(xlsxPath, "Puzzle");

  const hasAudio = fs.existsSync(path.join(moduleDir, "audio", "lesson.mp3"));
  const hasVideo = fs.existsSync(path.join(moduleDir, "video", "lesson.mp4"));

  const sort = (arr: any[]) =>
    arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  res.json({
    moduleId,
    info: info[0] || {},
    content: sort(content as any[]),
    quiz1: sort(quiz1 as any[]),
    quiz2: sort(quiz2 as any[]),
    puzzle: sort(puzzle as any[]),
    hasAudio,
    hasVideo,
    audioUrl: hasAudio ? `/api/content/${moduleId}/audio` : null,
    videoUrl: hasVideo ? `/api/content/${moduleId}/video` : null,
  });
});

// POST /api/content/:moduleId/complete — mark module done if XP >= 150 (75%)
router.post("/:moduleId/complete", async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const moduleId = parseInt(req.params.moduleId);
  const { xpEarned = 0, maxXp = 200 } = req.body as {
    xpEarned: number;
    maxXp: number;
  };

  const MIN_PASS_XP = 150; // 75% of 200
  const passed = xpEarned >= MIN_PASS_XP;

  if (!passed) {
    res.json({
      passed: false,
      message: "Score below 75%. Keep practising!",
      xpEarned,
      minRequired: MIN_PASS_XP,
    });
    return;
  }

  try {
    // Fetch all lessons belonging to this module in the DB
    const lessons = await db
      .select()
      .from(lessonsTable)
      .where(eq(lessonsTable.moduleId, moduleId));

    // Mark every lesson as completed (so the next module unlocks)
    for (const lesson of lessons) {
      const existing = await db
        .select()
        .from(userLessonProgressTable)
        .where(
          and(
            eq(userLessonProgressTable.userId, userId),
            eq(userLessonProgressTable.lessonId, lesson.id),
          ),
        );

      if (existing.length === 0) {
        await db.insert(userLessonProgressTable).values({
          userId,
          lessonId: lesson.id,
          completed: true,
          score: 5,
          totalQuestions: 5,
          completedAt: new Date(),
        });
      } else {
        await db
          .update(userLessonProgressTable)
          .set({ completed: true, completedAt: new Date() })
          .where(
            and(
              eq(userLessonProgressTable.userId, userId),
              eq(userLessonProgressTable.lessonId, lesson.id),
            ),
          );
      }
    }

    // Award XP to user
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));
    if (user) {
      const newXp = user.totalXp + xpEarned;
      const newLevel = Math.floor(newXp / 100) + 1;
      await db
        .update(usersTable)
        .set({ totalXp: newXp, level: newLevel })
        .where(eq(usersTable.id, userId));

      await db.insert(activityTable).values({
        userId,
        type: "lesson_complete",
        description: `Completed module ${moduleId} with ${xpEarned} XP 🎉`,
        xpEarned,
      });
    }

    res.json({
      passed: true,
      xpEarned,
      message: `Module ${moduleId} completed! Next module unlocked.`,
      nextModuleId: moduleId + 1,
    });
  } catch (err) {
    console.error("Error completing module:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET audio / video static files
router.get("/:moduleId/audio", (req, res) => {
  const moduleDir = getModuleDir(parseInt(req.params.moduleId));
  if (!moduleDir) {
    res.status(404).end();
    return;
  }
  const p = path.join(moduleDir, "audio", "lesson.mp3");
  if (!fs.existsSync(p)) {
    res.status(404).end();
    return;
  }
  res.sendFile(p);
});

router.get("/:moduleId/video", (req, res) => {
  const moduleDir = getModuleDir(parseInt(req.params.moduleId));
  if (!moduleDir) {
    res.status(404).end();
    return;
  }
  const p = path.join(moduleDir, "video", "lesson.mp4");
  if (!fs.existsSync(p)) {
    res.status(404).end();
    return;
  }
  res.sendFile(p);
});

export default router;
