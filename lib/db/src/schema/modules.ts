import { pgTable, text, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const modulesTable = pgTable("modules", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull().default("📚"),
  orderIndex: integer("order_index").notNull(),
  xpReward: integer("xp_reward").notNull().default(50),
});

export const lessonsTable = pgTable("lessons", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  moduleId: integer("module_id").notNull().references(() => modulesTable.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  orderIndex: integer("order_index").notNull(),
  xpReward: integer("xp_reward").notNull().default(20),
  lessonType: text("lesson_type").notNull().default("quiz"),
});

export const questionsTable = pgTable("questions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  lessonId: integer("lesson_id").notNull().references(() => lessonsTable.id),
  questionText: text("question_text").notNull(),
  questionType: text("question_type").notNull().default("multiple_choice"),
  options: text("options"),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  orderIndex: integer("order_index").notNull(),
});

export const insertModuleSchema = createInsertSchema(modulesTable);
export const insertLessonSchema = createInsertSchema(lessonsTable);
export const insertQuestionSchema = createInsertSchema(questionsTable);

export type InsertModule = z.infer<typeof insertModuleSchema>;
export type Module = typeof modulesTable.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessonsTable.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questionsTable.$inferSelect;
