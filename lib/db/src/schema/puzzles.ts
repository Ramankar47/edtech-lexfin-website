import { pgTable, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const puzzlesTable = pgTable("puzzles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull().default("easy"),
  puzzleType: text("puzzle_type").notNull().default("scenario"),
  xpReward: integer("xp_reward").notNull().default(30),
  content: text("content"),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const userPuzzleProgressTable = pgTable("user_puzzle_progress", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id").notNull().references(() => usersTable.id),
  puzzleId: integer("puzzle_id").notNull().references(() => puzzlesTable.id),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
});

export const insertPuzzleSchema = createInsertSchema(puzzlesTable);
export const insertUserPuzzleProgressSchema = createInsertSchema(userPuzzleProgressTable);

export type InsertPuzzle = z.infer<typeof insertPuzzleSchema>;
export type Puzzle = typeof puzzlesTable.$inferSelect;
export type InsertUserPuzzleProgress = z.infer<typeof insertUserPuzzleProgressSchema>;
export type UserPuzzleProgress = typeof userPuzzleProgressTable.$inferSelect;
