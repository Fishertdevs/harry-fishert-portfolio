import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

// Estado temporal del bot de Telegram: cuando el admin toca "✏️ Editar" en una
// reseña, guardamos aquí qué reseña está esperando texto nuevo para ese chat.
// Se necesita persistir en DB (y no en memoria) porque el webhook corre en
// funciones serverless sin estado compartido entre invocaciones.
export const telegramPendingEditsTable = pgTable("telegram_pending_edits", {
  chatId: text("chat_id").primaryKey(),
  reviewId: integer("review_id").notNull(),
  promptMessageId: integer("prompt_message_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type TelegramPendingEdit = typeof telegramPendingEditsTable.$inferSelect;
