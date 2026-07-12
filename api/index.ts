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

async function notifyNewReview(review: any): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  try {
    await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatReviewMessage(review),
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[
            { text: "✅ Aprobar", callback_data: `appr:${review.id}` },
            { text: "🗑️ Eliminar", callback_data: `del:${review.id}` },
          ]],
        },
      }),
    });
  } catch (err) {
    console.error("Error enviando notificación de Telegram:", err);
  }
}

async function editReviewMessage(chatId: number | string, messageId: number, review: any, statusLine: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  try {
    await fetch(`${TELEGRAM_API}/bot${token}/editMessageText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, message_id: messageId, text: formatReviewMessage(review, statusLine), parse_mode: "HTML" }),
    });
  } catch (err) {
    console.error("Error editando mensaje de Telegram:", err);
  }
}

async function answerCallbackQuery(callbackQueryId: string, text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  try {
    await fetch(`${TELEGRAM_API}/bot${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
    });
  } catch (err) {
    console.error("Error respondiendo callback de Telegram:", err);
  }
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

    // POST /telegram-webhook — botones Aprobar/Eliminar de la notificación
    if (req.method === "POST" && url.includes("/telegram-webhook")) {
      send(200, { ok: true });
      const update = req.body || {};
      const callback = update.callback_query;
      if (!callback) return;
      const [action, idStr] = String(callback.data || "").split(":");
      const id = Number(idStr);
      const chatId = callback.message?.chat?.id;
      const messageId = callback.message?.message_id;
      if (!id || isNaN(id) || !chatId || !messageId) {
        await answerCallbackQuery(callback.id, "Acción inválida");
        return;
      }
      if (action === "appr") {
        // Responder al toque del botón de inmediato (no esperar la DB) para que
        // el spinner del botón desaparezca al instante; el mensaje se edita después.
        answerCallbackQuery(callback.id, "Aprobando…").catch(() => {});
        const [updated] = await sql`UPDATE reviews SET approved = true WHERE id = ${id} RETURNING *`;
        if (!updated) return;
        await editReviewMessage(chatId, messageId, updated, "✅ <b>Aprobada</b> — ya es visible en el sitio.");
        return;
      }
      if (action === "del") {
        answerCallbackQuery(callback.id, "Eliminando…").catch(() => {});
        const [deleted] = await sql`DELETE FROM reviews WHERE id = ${id} RETURNING *`;
        if (!deleted) return;
        await editReviewMessage(chatId, messageId, deleted, "🗑️ <b>Eliminada</b> — no se publicará.");
        return;
      }
      await answerCallbackQuery(callback.id, "Acción desconocida");
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
