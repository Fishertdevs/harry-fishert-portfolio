import { neon } from "@neondatabase/serverless";
import type { IncomingMessage, ServerResponse } from "node:http";

const sql = neon(process.env.NEON_DATABASE_URL!);

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
      const [created] = await sql`
        INSERT INTO reviews (name, email, position, company, rating, review, approved)
        VALUES (${name}, ${email || null}, ${position || null}, ${company || null}, ${Number(rating)}, ${review}, true)
        RETURNING *
      `;
      send(201, created);
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
