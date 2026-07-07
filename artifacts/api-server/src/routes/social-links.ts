import { Router, type IRouter } from "express";
import { db, socialLinksTable, insertSocialLinkSchema } from "@workspace/db";
import { asc, eq } from "drizzle-orm";

const router: IRouter = Router();

// GET /api/social-links — activos ordenados
router.get("/social-links", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(socialLinksTable)
      .where(eq(socialLinksTable.active, true))
      .orderBy(asc(socialLinksTable.displayOrder));
    res.json(rows);
  } catch (err) {
    console.error("GET /social-links error:", err);
    res.status(500).json({ error: "Error al obtener redes sociales" });
  }
});

// GET /api/social-links/all — todos (admin)
router.get("/social-links/all", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(socialLinksTable)
      .orderBy(asc(socialLinksTable.displayOrder));
    res.json(rows);
  } catch (err) {
    console.error("GET /social-links/all error:", err);
    res.status(500).json({ error: "Error al obtener redes sociales" });
  }
});

// POST /api/social-links — crear
router.post("/social-links", async (req, res) => {
  try {
    const parsed = insertSocialLinkSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const [created] = await db.insert(socialLinksTable).values(parsed.data).returning();
    res.status(201).json(created);
  } catch (err) {
    console.error("POST /social-links error:", err);
    res.status(500).json({ error: "Error al crear enlace" });
  }
});

// PUT /api/social-links/:id — actualizar
router.put("/social-links/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }

    const { platform, label, url, displayOrder, active } = req.body as Record<string, unknown>;
    const updateData: Record<string, unknown> = {};
    if (typeof platform === "string" && platform.trim()) updateData.platform = platform.trim();
    if (typeof label === "string") updateData.label = label;
    if (typeof url === "string" && url.trim()) updateData.url = url.trim();
    if (typeof displayOrder === "number") updateData.displayOrder = displayOrder;
    if (typeof active === "boolean") updateData.active = active;

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: "No hay campos válidos para actualizar" });
      return;
    }

    const [updated] = await db
      .update(socialLinksTable)
      .set(updateData)
      .where(eq(socialLinksTable.id, id))
      .returning();

    if (!updated) { res.status(404).json({ error: "Enlace no encontrado" }); return; }
    res.json(updated);
  } catch (err) {
    console.error("PUT /social-links/:id error:", err);
    res.status(500).json({ error: "Error al actualizar enlace" });
  }
});

// DELETE /api/social-links/:id — eliminar
router.delete("/social-links/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }

    const [deleted] = await db
      .delete(socialLinksTable)
      .where(eq(socialLinksTable.id, id))
      .returning();

    if (!deleted) { res.status(404).json({ error: "Enlace no encontrado" }); return; }
    res.status(204).send();
  } catch (err) {
    console.error("DELETE /social-links/:id error:", err);
    res.status(500).json({ error: "Error al eliminar enlace" });
  }
});

export default router;
