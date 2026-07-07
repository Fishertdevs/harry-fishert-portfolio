import { neon } from "@neondatabase/serverless";
import type { IncomingMessage, ServerResponse } from "node:http";

const sql = neon(process.env.NEON_DATABASE_URL!);

export default async function handler(req: IncomingMessage & { body?: any; query?: Record<string, string> }, res: ServerResponse & { json?: Function }) {
  const setHeader = (k: string, v: string) => res.setHeader(k, v);
  setHeader("Access-Control-Allow-Origin", "*");
  setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
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

  try {
    if (req.method === "GET" && url.includes("/reviews")) {
      const rows = await sql`SELECT * FROM reviews WHERE approved = true ORDER BY created_at DESC`;
      send(200, rows);
      return;
    }

    if (req.method === "POST" && url.includes("/reviews")) {
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
