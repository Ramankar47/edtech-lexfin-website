import { Router, type IRouter } from "express";
import { createRequire } from "module";
import path from "path";
import fs from "fs";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

const router: IRouter = Router();

const BLOGS_DIR = path.resolve(process.cwd(), "../../content/blogs");
const PHOTO_DIR = path.join(BLOGS_DIR, "photo");

const CATEGORY_FILES: Record<string, string> = {
  academicians: "From_Academicians.xlsx",
  students: "From_Students.xlsx",
};

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

function resolvePhotoUrl(category: string, id: number): string | null {
  const dir = path.join(PHOTO_DIR, category);
  for (const ext of IMAGE_EXTENSIONS) {
    if (fs.existsSync(path.join(dir, `${id}.${ext}`))) {
      return `/blog-photos/${category}/${id}.${ext}`;
    }
  }
  return null;
}

function readBlogsFromXlsx(filePath: string, category: string): {
  id: number;
  name: string;
  designation: string;
  blog: string;
  photoUrl: string | null;
}[] {
  try {
    const wb = XLSX.readFile(filePath);
    const sheetName = wb.SheetNames[0];
    const ws = wb.Sheets[sheetName];
    if (!ws) return [];

    const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

    // Find header row (the row containing "Name")
    let headerIdx = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].some((cell: any) => typeof cell === "string" && cell.toLowerCase().includes("name"))) {
        headerIdx = i;
        break;
      }
    }

    if (headerIdx === -1) return [];

    const headers: string[] = rows[headerIdx].map((h: any) => String(h || "").trim());
    const numCol   = headers.findIndex(h => h === "#" || h.toLowerCase() === "number");
    const blogCol  = headers.findIndex(h => h.toLowerCase().includes("blog"));
    const nameCol  = headers.findIndex(h => h.toLowerCase() === "name");
    const desigCol = headers.findIndex(h => h.toLowerCase().includes("designation"));

    const results = [];
    for (let i = headerIdx + 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.every((c: any) => c == null || c === "")) continue;
      const name = nameCol >= 0 ? String(row[nameCol] || "").trim() : "";
      if (!name) continue;
      const id = numCol >= 0 ? Number(row[numCol] || i) : i;
      results.push({
        id,
        name,
        designation: desigCol >= 0 ? String(row[desigCol] || "").trim() : "",
        blog: blogCol >= 0 ? String(row[blogCol] || "").trim() : "",
        photoUrl: resolvePhotoUrl(category, id),
      });
    }
    return results;
  } catch (err) {
    console.error("Error reading blogs xlsx:", err);
    return [];
  }
}

// GET /api/blogs/:category  — returns all entries for the given category
router.get("/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const fileName = CATEGORY_FILES[category];
  if (!fileName) {
    res.status(404).json({ error: `Unknown category: ${category}` });
    return;
  }

  const filePath = path.join(BLOGS_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: `Content file not found: ${fileName}` });
    return;
  }

  const entries = readBlogsFromXlsx(filePath, category);
  res.json({ category, entries });
});

export default router;
