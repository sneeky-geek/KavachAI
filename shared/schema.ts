import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  name: text("name").notNull(),
  age: integer("age"),
  department: text("department"),
  experience: integer("experience"),
  qualification: text("qualification")
});

export const tests = pgTable("tests", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(),
  duration: text("duration").notNull(),
  date: text("date").notNull(),
  teacherId: integer("teacher_id").notNull(),
  status: text("status").default("upcoming")
});

export const insertUserSchema = createInsertSchema(users);
export const insertTestSchema = createInsertSchema(tests);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTest = z.infer<typeof insertTestSchema>;
export type User = typeof users.$inferSelect;
export type Test = typeof tests.$inferSelect;
