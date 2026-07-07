import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const socialLinksTable = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),       // "github" | "instagram" | "whatsapp" | "email" | "phone" | "linkedin" …
  label: text("label").notNull().default(""), // texto para mostrar, ej: "fishertcode@gmail.com"
  url: text("url").notNull(),                 // href completo: "https://…" | "mailto:…" | "tel:…"
  displayOrder: integer("display_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSocialLinkSchema = createInsertSchema(socialLinksTable).omit({
  id: true,
  createdAt: true,
});
export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type SocialLink = typeof socialLinksTable.$inferSelect;
