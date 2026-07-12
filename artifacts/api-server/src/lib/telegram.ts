// Notificaciones y control de reseñas vía Telegram.
// Requiere TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID en las variables de entorno.

import { logger } from "./logger";

const TELEGRAM_API = "https://api.telegram.org";

function getConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return null;
  return { token, chatId };
}

interface ReviewLike {
  id: number;
  name: string;
  email?: string | null;
  position?: string | null;
  company?: string | null;
  rating: number;
  review: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatReviewMessage(review: ReviewLike, statusLine?: string): string {
  const stars = "⭐".repeat(Math.max(1, Math.min(5, review.rating)));
  const roleParts = [review.position, review.company].filter(Boolean).join(" en ");
  const lines = [
    "📝 <b>Nueva reseña pendiente</b>",
    "",
    `👤 <b>${escapeHtml(review.name)}</b>${roleParts ? ` — ${escapeHtml(roleParts)}` : ""}`,
    stars,
    "",
    `“${escapeHtml(review.review)}”`,
  ];
  if (review.email) lines.push("", `✉️ ${escapeHtml(review.email)}`);
  if (statusLine) lines.push("", statusLine);
  return lines.join("\n");
}

// Envía la notificación de una reseña nueva con botones Aprobar/Eliminar.
export async function notifyNewReview(review: ReviewLike): Promise<void> {
  const config = getConfig();
  if (!config) {
    logger.warn("TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID no configurados; se omite notificación");
    return;
  }
  try {
    const res = await fetch(`${TELEGRAM_API}/bot${config.token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: formatReviewMessage(review),
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "✅ Aprobar", callback_data: `appr:${review.id}` },
              { text: "🗑️ Eliminar", callback_data: `del:${review.id}` },
            ],
          ],
        },
      }),
    });
    if (!res.ok) {
      logger.error({ status: res.status, body: await res.text() }, "Error enviando notificación de Telegram");
    }
  } catch (err) {
    logger.error({ err }, "Error de red enviando notificación de Telegram");
  }
}

// Edita el mensaje original para reflejar la acción tomada.
// IMPORTANTE: Telegram no conserva el teclado inline al editar el texto si no
// se lo volvés a mandar explícitamente — hay que decidir en cada caso qué
// botones quedan (o ninguno).
export async function updateReviewMessage(
  chatId: number | string,
  messageId: number,
  review: ReviewLike,
  statusLine: string,
  keepDeleteButton = false,
): Promise<void> {
  const config = getConfig();
  if (!config) return;
  const reply_markup = keepDeleteButton
    ? { inline_keyboard: [[{ text: "🗑️ Eliminar", callback_data: `del:${review.id}` }]] }
    : { inline_keyboard: [] };
  try {
    await fetch(`${TELEGRAM_API}/bot${config.token}/editMessageText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text: formatReviewMessage(review, statusLine),
        parse_mode: "HTML",
        reply_markup,
      }),
    });
  } catch (err) {
    logger.error({ err }, "Error editando mensaje de Telegram");
  }
}

export async function answerCallbackQuery(callbackQueryId: string, text: string): Promise<void> {
  const config = getConfig();
  if (!config) return;
  try {
    await fetch(`${TELEGRAM_API}/bot${config.token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
    });
  } catch (err) {
    logger.error({ err }, "Error respondiendo callback de Telegram");
  }
}
