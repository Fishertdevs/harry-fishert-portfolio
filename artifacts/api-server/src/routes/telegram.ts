import { Router, type IRouter } from "express";
import { db, reviewsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { answerCallbackQuery, updateReviewMessage } from "../lib/telegram";

const router: IRouter = Router();

// POST /api/telegram/webhook — recibe las pulsaciones de los botones
// Aprobar/Eliminar que se envían junto a la notificación de cada reseña nueva.
router.post("/telegram/webhook", async (req, res) => {
  // Confirmamos siempre 200 rápido para que Telegram no reintente.
  res.status(200).json({ ok: true });

  try {
    const update = req.body as any;
    const callback = update?.callback_query;
    if (!callback) return;

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
      // Responder al toque del botón de inmediato (no esperar la DB) para que
      // el spinner del botón desaparezca al instante; el mensaje se edita después.
      answerCallbackQuery(callback.id, "Aprobando…").catch(() => {});
      const [updated] = await db
        .update(reviewsTable)
        .set({ approved: true })
        .where(eq(reviewsTable.id, id))
        .returning();
      if (!updated) return;
      await updateReviewMessage(chatId, messageId, updated, "✅ <b>Aprobada</b> — ya es visible en el sitio.");
      return;
    }

    if (action === "del") {
      answerCallbackQuery(callback.id, "Eliminando…").catch(() => {});
      const [deleted] = await db
        .delete(reviewsTable)
        .where(eq(reviewsTable.id, id))
        .returning();
      if (!deleted) return;
      await updateReviewMessage(chatId, messageId, deleted, "🗑️ <b>Eliminada</b> — no se publicará.");
      return;
    }

    await answerCallbackQuery(callback.id, "Acción desconocida");
  } catch (err) {
    console.error("POST /telegram/webhook error:", err);
  }
});

export default router;
