import { neon } from "@neondatabase/serverless";
import type { IncomingMessage, ServerResponse } from "node:http";

const sql = neon(process.env.NEON_DATABASE_URL!);

// ── Notificaciones y control de reseñas vía Telegram ─────────────────────────
const TELEGRAM_API = "https://api.telegram.org";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatReviewMessage(review: any, statusLine?: string): string {
  const stars = "⭐".repeat(Math.max(1, Math.min(5, Number(review.rating) || 5)));
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

type ReviewKeyboardState = "pending" | "approved" | "deleted";

function buildReviewKeyboard(review: any, state: ReviewKeyboardState) {
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
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) console.error(`Error llamando a Telegram (${method}):`, json);
    return json;
  } catch (err) {
    console.error(`Error de red llamando a Telegram (${method}):`, err);
    return null;
  }
}

async function notifyNewReview(review: any): Promise<void> {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!chatId) return;
  await callTelegram("sendMessage", {
    chat_id: chatId,
    text: formatReviewMessage(review),
    parse_mode: "HTML",
    reply_markup: buildReviewKeyboard(review, "pending"),
  });
}

// IMPORTANTE: Telegram no conserva el teclado inline al editar el texto si no
// se lo volvés a mandar explícitamente — hay que decidir en cada caso qué
// botones quedan (o ninguno).
async function editReviewMessage(chatId: number | string, messageId: number, review: any, state: ReviewKeyboardState): Promise<void> {
  await callTelegram("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text: formatReviewMessage(review, statusLineFor(state)),
    parse_mode: "HTML",
    reply_markup: buildReviewKeyboard(review, state),
  });
}

// Tarjeta de una reseña existente (usada por /resenas), con el teclado según
// si ya está aprobada o sigue pendiente. Devuelve el message_id enviado.
async function sendReviewCard(review: any): Promise<number | null> {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!chatId) return null;
  const state: ReviewKeyboardState = review.approved ? "approved" : "pending";
  const result = await callTelegram("sendMessage", {
    chat_id: chatId,
    text: formatReviewMessage(review, statusLineFor(state)),
    parse_mode: "HTML",
    reply_markup: buildReviewKeyboard(review, state),
  });
  return result?.result?.message_id ?? null;
}

async function sendPlainMessage(chatId: number | string, text: string): Promise<number | null> {
  const result = await callTelegram("sendMessage", { chat_id: chatId, text, parse_mode: "HTML" });
  return result?.result?.message_id ?? null;
}

async function answerCallbackQuery(callbackQueryId: string, text: string): Promise<void> {
  await callTelegram("answerCallbackQuery", { callback_query_id: callbackQueryId, text });
}

const EDIT_TIMEOUT_MS = 10 * 60 * 1000; // una edición pendiente vence a los 10 min

async function handleTelegramCallback(callback: any): Promise<void> {
  const data: string = callback.data || "";
  const [action, idStr] = data.split(":");
  const id = Number(idStr);
  const chatId = callback.message?.chat?.id;
  const messageId = callback.message?.message_id;

  if (!id || isNaN(id) || !chatId || !messageId) {
    await answerCallbackQuery(callback.id, "Acción inválida");
    return;
  }

  if (action === "appr") {
    answerCallbackQuery(callback.id, "Aprobando…").catch(() => {});
    const [updated] = await sql`UPDATE reviews SET approved = true WHERE id = ${id} RETURNING *`;
    if (!updated) return;
    await editReviewMessage(chatId, messageId, updated, "approved");
    return;
  }

  if (action === "del") {
    answerCallbackQuery(callback.id, "Eliminando…").catch(() => {});
    const [deleted] = await sql`DELETE FROM reviews WHERE id = ${id} RETURNING *`;
    if (!deleted) return;
    await sql`DELETE FROM telegram_pending_edits WHERE chat_id = ${String(chatId)}`;
    await editReviewMessage(chatId, messageId, deleted, "deleted");
    return;
  }

  if (action === "edit") {
    const [review] = await sql`SELECT * FROM reviews WHERE id = ${id}`;
    if (!review) {
      await answerCallbackQuery(callback.id, "Esa reseña ya no existe");
      return;
    }
    answerCallbackQuery(callback.id, "Enviá el nuevo texto").catch(() => {});
    await sql`
      INSERT INTO telegram_pending_edits (chat_id, review_id, created_at)
      VALUES (${String(chatId)}, ${id}, now())
      ON CONFLICT (chat_id) DO UPDATE SET review_id = ${id}, created_at = now()
    `;
    await sendPlainMessage(
      chatId,
      `✏️ Escribí y enviá el <b>nuevo texto</b> para la reseña de <b>${escapeHtml(review.name)}</b>.\n\nEnviá /cancelar para no cambiar nada.`,
    );
    return;
  }

  await answerCallbackQuery(callback.id, "Acción desconocida");
}

async function handleTelegramMessage(message: any): Promise<void> {
  const chatId = message.chat?.id;
  const text: string = (message.text || "").trim();
  if (!chatId || !text) return;

  if (text === "/resenas" || text === "/reviews") {
    const all = await sql`SELECT * FROM reviews ORDER BY created_at DESC`;
    if (all.length === 0) {
      await sendPlainMessage(chatId, "No hay reseñas todavía.");
      return;
    }
    const pending = all.filter((r: any) => !r.approved).length;
    await sendPlainMessage(
      chatId,
      `📋 <b>${all.length}</b> reseña(s) en total — <b>${pending}</b> pendiente(s) de aprobación.`,
    );
    for (const review of all) {
      await sendReviewCard(review);
    }
    return;
  }

  if (text === "/cancelar") {
    const deleted = await sql`DELETE FROM telegram_pending_edits WHERE chat_id = ${String(chatId)} RETURNING *`;
    if (deleted.length > 0) await sendPlainMessage(chatId, "Edición cancelada, no se cambió nada.");
    return;
  }

  const [pendingEdit] = await sql`SELECT * FROM telegram_pending_edits WHERE chat_id = ${String(chatId)}`;
  if (!pendingEdit) return; // texto suelto que no corresponde a ningún flujo

  const isExpired = Date.now() - new Date(pendingEdit.created_at).getTime() > EDIT_TIMEOUT_MS;
  await sql`DELETE FROM telegram_pending_edits WHERE chat_id = ${String(chatId)}`;
  if (isExpired) {
    await sendPlainMessage(chatId, "La edición venció por tiempo, tocá ✏️ Editar de nuevo si querés cambiar el texto.");
    return;
  }

  const [updated] = await sql`UPDATE reviews SET review = ${text} WHERE id = ${pendingEdit.review_id} RETURNING *`;
  if (!updated) {
    await sendPlainMessage(chatId, "Esa reseña ya no existe, no se pudo editar.");
    return;
  }
  await sendPlainMessage(chatId, "✅ Texto actualizado.");
  await sendReviewCard(updated);
}

export default async function handler(req: IncomingMessage & { body?: any; query?: Record<string, string> }, res: ServerResponse & { json?: Function }) {
  const setHeader = (k: string, v: string) => res.setHeader(k, v);
  setHeader("Access-Control-Allow-Origin", "*");
  setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  setHeader("Access-Control-Allow-Headers", "Content-Type");

  const send = (status: number, data: unknown) => {
    const body = JSON.stringify(data);
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(body);
  };

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = req.url || "";

  // Extraer :id de rutas como /reviews/123, /reviews/123/like, /reviews/123/approve
  const idMatch = url.match(/\/reviews\/(\d+)(?:\/(like|approve))?/);
  const reviewId = idMatch ? Number(idMatch[1]) : null;
  const reviewAction = idMatch ? idMatch[2] : null;

  try {
    // GET /reviews (lista, sin :id)
    if (req.method === "GET" && url.includes("/reviews") && reviewId === null) {
      const rows = await sql`SELECT * FROM reviews WHERE approved = true ORDER BY created_at DESC`;
      send(200, rows);
      return;
    }

    if (req.method === "POST" && url.includes("/reviews") && reviewId === null) {
      const { name, email, position, company, rating, review } = req.body || {};
      if (!name || !rating || !review) {
        send(400, { error: "name, rating and review are required" });
        return;
      }
      // Nunca confiar en el cliente para "approved": toda reseña queda
      // pendiente hasta aprobarse desde Telegram.
      const [created] = await sql`
        INSERT INTO reviews (name, email, position, company, rating, review, approved)
        VALUES (${name}, ${email || null}, ${position || null}, ${company || null}, ${Number(rating)}, ${review}, false)
        RETURNING *
      `;
      send(201, created);
      notifyNewReview(created).catch(() => {});
      return;
    }

    // POST /telegram-webhook — botones Aprobar/Editar/Eliminar y comandos de
    // texto (/resenas, /cancelar, y el texto nuevo tras tocar Editar).
    // IMPORTANTE: en funciones serverless de Vercel, el contenedor puede
    // congelarse apenas se envía la respuesta HTTP — cualquier `await`
    // posterior a un `res.end()` puede quedar cortado a mitad de camino.
    // Por eso procesamos todo ANTES de responder (salvo el ack del botón,
    // que sí se dispara sin esperar solo para que el spinner de Telegram
    // desaparezca al instante).
    if (req.method === "POST" && url.includes("/telegram-webhook")) {
      const update = req.body || {};
      try {
        if (update.callback_query) {
          await handleTelegramCallback(update.callback_query);
        } else if (update.message) {
          await handleTelegramMessage(update.message);
        }
      } catch (err) {
        console.error("Error procesando update de Telegram:", err);
      }
      send(200, { ok: true });
      return;
    }

    // DELETE /reviews/:id — eliminar reseña
    if (req.method === "DELETE" && reviewId !== null && !reviewAction) {
      const [deleted] = await sql`DELETE FROM reviews WHERE id = ${reviewId} RETURNING *`;
      if (!deleted) {
        send(404, { error: "Reseña no encontrada" });
        return;
      }
      res.writeHead(204);
      res.end();
      return;
    }

    // PUT /reviews/:id — actualizar reseña
    if (req.method === "PUT" && reviewId !== null && !reviewAction) {
      const { name, email, position, company, rating, review } = req.body || {};
      const [updated] = await sql`
        UPDATE reviews SET
          name = COALESCE(${name ?? null}, name),
          email = ${email !== undefined ? email : sql`email`},
          position = ${position !== undefined ? position : sql`position`},
          company = ${company !== undefined ? company : sql`company`},
          rating = COALESCE(${rating ?? null}, rating),
          review = COALESCE(${review ?? null}, review)
        WHERE id = ${reviewId}
        RETURNING *
      `;
      if (!updated) {
        send(404, { error: "Reseña no encontrada" });
        return;
      }
      send(200, updated);
      return;
    }

    // PATCH /reviews/:id/like — incrementar likes
    if (req.method === "PATCH" && reviewId !== null && reviewAction === "like") {
      const [updated] = await sql`
        UPDATE reviews SET likes = COALESCE(likes, 0) + 1
        WHERE id = ${reviewId}
        RETURNING *
      `;
      if (!updated) {
        send(404, { error: "Reseña no encontrada" });
        return;
      }
      send(200, updated);
      return;
    }

    // PATCH /reviews/:id/approve — aprobar u ocultar
    if (req.method === "PATCH" && reviewId !== null && reviewAction === "approve") {
      const { approved } = req.body || {};
      if (typeof approved !== "boolean") {
        send(400, { error: "Se requiere { approved: boolean }" });
        return;
      }
      const [updated] = await sql`
        UPDATE reviews SET approved = ${approved}
        WHERE id = ${reviewId}
        RETURNING *
      `;
      if (!updated) {
        send(404, { error: "Reseña no encontrada" });
        return;
      }
      send(200, updated);
      return;
    }

    if (req.method === "GET" && url.includes("/social-links")) {
      const rows = await sql`SELECT * FROM social_links WHERE active = true ORDER BY display_order ASC`;
      send(200, rows);
      return;
    }

    if (req.method === "POST" && url.includes("/contact-messages")) {
      const { name, email, message, subject } = req.body || {};
      if (!name || !email || !message) {
        send(400, { error: "name, email and message are required" });
        return;
      }
      const [created] = await sql`
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (${name}, ${email}, ${subject || null}, ${message})
        RETURNING *
      `;
      send(201, created);
      return;
    }

    if (url.includes("/health")) {
      send(200, { ok: true });
      return;
    }

    send(404, { error: "Not found" });
  } catch (e: any) {
    console.error("API error:", e);
    send(500, { error: e.message });
  }
}
