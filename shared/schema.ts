import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  userName: text("user_name").notNull(),
  answers: json("answers").$type<Record<string, number>>().notNull(),
  type: text("type").notNull(),
  details: json("details").$type<{
    mind: number;    // E/I score
    energy: number;  // S/N score
    nature: number;  // T/F score
    tactics: number; // J/P score
    traits: {
      extraversion: number;
      introversion: number;
      sensing: number;
      intuition: number;
      thinking: number;
      feeling: number;
      judging: number;
      perceiving: number;
    };
  }>().notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTestResultSchema = createInsertSchema(testResults).pick({
  userId: true,
  userName: true,
  answers: true,
  type: true,
  details: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TestResult = typeof testResults.$inferSelect;
export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
