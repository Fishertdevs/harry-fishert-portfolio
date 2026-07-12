import { Router, type IRouter } from "express";
import { db, reviewsTable, insertReviewSchema } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { notifyNewReview } from "../lib/telegram";

const router: IRouter = Router();

// GET /api/reviews          — público (solo aprobadas)
// GET /api/reviews?admin=1  — todas (para panel admin)
router.get("/reviews", async (req, res) => {
  try {
    const isAdmin = req.query.admin === "1";

    const rows = isAdmin
      ? await db.select().from(reviewsTable).orderBy(desc(reviewsTable.createdAt))
      : await db
          .select()
          .from(reviewsTable)
          .where(eq(reviewsTable.approved, true))
          .orderBy(desc(reviewsTable.createdAt));

    res.json(rows);
  } catch (err) {
    console.error("GET /reviews error:", err);
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
});

// POST /api/reviews — crear nueva reseña (queda pendiente hasta aprobarse por Telegram)
router.post("/reviews", async (req, res) => {
  try {
    const parsed = insertReviewSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    // Nunca confiar en el cliente para el estado de aprobación: toda reseña
    // nueva queda pendiente hasta que se apruebe desde Telegram.
    const [created] = await db
      .insert(reviewsTable)
      .values({ ...parsed.data, approved: false })
      .returning();
    res.status(201).json(created);
    notifyNewReview(created).catch(() => {});
  } catch (err) {
    console.error("POST /reviews error:", err);
    res.status(500).json({ error: "Error al crear reseña" });
  }
});

// PUT /api/reviews/:id — actualizar reseña
router.put("/reviews/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }

    const { name, email, position, company, rating, review } = req.body as Record<string, unknown>;

    // Validación básica: al menos un campo debe estar presente
    const updateData: Record<string, unknown> = {};
    if (typeof name === "string" && name.trim()) updateData.name = name.trim();
    if (typeof email === "string") updateData.email = email || null;
    if (typeof position === "string") updateData.position = position || null;
    if (typeof company === "string") updateData.company = company || null;
    if (typeof rating === "number" && rating >= 1 && rating <= 5) updateData.rating = rating;
    if (typeof review === "string" && review.trim()) updateData.review = review.trim();

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: "No hay campos válidos para actualizar" });
      return;
    }

    const [updated] = await db
      .update(reviewsTable)
      .set(updateData)
      .where(eq(reviewsTable.id, id))
      .returning();

    if (!updated) { res.status(404).json({ error: "Reseña no encontrada" }); return; }
    res.json(updated);
  } catch (err) {
    console.error("PUT /reviews/:id error:", err);
    res.status(500).json({ error: "Error al actualizar reseña" });
  }
});

// DELETE /api/reviews/:id — eliminar reseña
router.delete("/reviews/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }

    const [deleted] = await db
      .delete(reviewsTable)
      .where(eq(reviewsTable.id, id))
      .returning();

    if (!deleted) { res.status(404).json({ error: "Reseña no encontrada" }); return; }
    res.status(204).send();
  } catch (err) {
    console.error("DELETE /reviews/:id error:", err);
    res.status(500).json({ error: "Error al eliminar reseña" });
  }
});

// PATCH /api/reviews/:id/approve — aprobar o ocultar
router.patch("/reviews/:id/approve", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }

    const { approved } = req.body as Record<string, unknown>;
    if (typeof approved !== "boolean") {
      res.status(400).json({ error: "Se requiere { approved: boolean }" });
      return;
    }

    const [updated] = await db
      .update(reviewsTable)
      .set({ approved })
      .where(eq(reviewsTable.id, id))
      .returning();

    if (!updated) { res.status(404).json({ error: "Reseña no encontrada" }); return; }
    res.json(updated);
  } catch (err) {
    console.error("PATCH /reviews/:id/approve error:", err);
    res.status(500).json({ error: "Error al actualizar estado" });
  }
});

// PATCH /api/reviews/:id/like — incrementar likes
router.patch("/reviews/:id/like", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }

    // Incrementar el contador atómicamente
    const [current] = await db.select({ likes: reviewsTable.likes }).from(reviewsTable).where(eq(reviewsTable.id, id));
    if (!current) { res.status(404).json({ error: "Reseña no encontrada" }); return; }

    const [updated] = await db
      .update(reviewsTable)
      .set({ likes: (current.likes ?? 0) + 1 })
      .where(eq(reviewsTable.id, id))
      .returning();

    res.json(updated);
  } catch (err) {
    console.error("PATCH /reviews/:id/like error:", err);
    res.status(500).json({ error: "Error al registrar like" });
  }
});

export default router;
