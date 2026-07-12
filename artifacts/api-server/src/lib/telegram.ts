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
  approved?: boolean;
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
  const heading = statusLine ? "📝 <b>Reseña</b>" : "📝 <b>Nueva reseña pendiente</b>";
  const lines = [
    heading,
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

// IMPORTANTE: Telegram no conserva el teclado inline al editar el texto si no
// se lo volvés a mandar explícitamente — hay que decidir en cada caso qué
// botones quedan (o ninguno).
type ReviewKeyboardState = "pending" | "approved" | "deleted";

function buildReviewKeyboard(review: ReviewLike, state: ReviewKeyboardState) {
  if (state === "deleted") return { inline_keyboard: [] };
  const row: { text: string; callback_data: string }[] = [];
  if (state === "pending") row.push({ text: "✅ Aprobar", callback_data: `appr:${review.id}` });
  row.push({ text: "✏️ Editar", callback_data: `edit:${review.id}` });
  row.push({ text: "🗑️ Eliminar", callback_data: `del:${review.id}` });
  return { inline_keyboard: [row] };
}

function statusLineFor(state: ReviewKeyboardState): string {
  if (state === "approved") return "✅ <b>Aprobada</b> — visible en el sitio.";
  if (state === "deleted") return "🗑️ <b>Eliminada</b> — no se publicará.";
  return "⏳ <b>Pendiente</b> de aprobación.";
}

async function callTelegram(method: string, body: unknown): Promise<any> {
  const config = getConfig();
  if (!config) {
    logger.warn("TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID no configurados; se omite llamada a Telegram");
    return null;
  }
  try {
    const res = await fetch(`${TELEGRAM_API}/bot${config.token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      logger.error({ status: res.status, body: json }, `Error llamando a Telegram (${method})`);
    }
    return json;
  } catch (err) {
    logger.error({ err }, `Error de red llamando a Telegram (${method})`);
    return null;
  }
}

// Envía la notificación de una reseña nueva con botones Aprobar/Editar/Eliminar.
export async function notifyNewReview(review: ReviewLike): Promise<void> {
  const config = getConfig();
  if (!config) return;
  await callTelegram("sendMessage", {
    chat_id: config.chatId,
    text: formatReviewMessage(review),
    parse_mode: "HTML",
    reply_markup: buildReviewKeyboard(review, "pending"),
  });
}

// Edita el mensaje original para reflejar la acción tomada (aprobar/eliminar/editar).
export async function updateReviewMessage(
  chatId: number | string,
  messageId: number,
  review: ReviewLike,
  state: ReviewKeyboardState,
): Promise<void> {
  await callTelegram("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text: formatReviewMessage(review, statusLineFor(state)),
    parse_mode: "HTML",
    reply_markup: buildReviewKeyboard(review, state),
  });
}

// Envía una tarjeta de una reseña existente (usada por /resenas) con el
// teclado correspondiente según si ya está aprobada o sigue pendiente.
// Devuelve el message_id enviado, útil si luego se quiere editar ese mensaje.
export async function sendReviewCard(review: ReviewLike): Promise<number | null> {
  const config = getConfig();
  if (!config) return null;
  const state: ReviewKeyboardState = review.approved ? "approved" : "pending";
  const result = await callTelegram("sendMessage", {
    chat_id: config.chatId,
    text: formatReviewMessage(review, statusLineFor(state)),
    parse_mode: "HTML",
    reply_markup: buildReviewKeyboard(review, state),
  });
  return result?.result?.message_id ?? null;
}

export async function sendPlainMessage(chatId: number | string, text: string): Promise<number | null> {
  const result = await callTelegram("sendMessage", { chat_id: chatId, text, parse_mode: "HTML" });
  return result?.result?.message_id ?? null;
}

export async function answerCallbackQuery(callbackQueryId: string, text: string): Promise<void> {
  await callTelegram("answerCallbackQuery", { callback_query_id: callbackQueryId, text });
}
