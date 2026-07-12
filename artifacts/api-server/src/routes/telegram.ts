import { Router, type IRouter } from "express";
import { db, reviewsTable, telegramPendingEditsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import {
  answerCallbackQuery,
  updateReviewMessage,
  sendReviewCard,
  sendPlainMessage,
} from "../lib/telegram";

const router: IRouter = Router();

const EDIT_TIMEOUT_MS = 10 * 60 * 1000; // una edición pendiente vence a los 10 min

// POST /api/telegram/webhook — recibe botones (Aprobar/Editar/Eliminar) y
// comandos/mensajes de texto (/resenas, y el texto nuevo tras tocar Editar).
// Procesamos todo antes de responder 200 (mismo criterio que la función
// serverless de producción, para que el comportamiento sea idéntico en
// ambos entornos y no dependa de si el proceso sigue vivo tras la respuesta).
router.post("/telegram/webhook", async (req, res) => {
  try {
    const update = req.body as any;

    if (update?.callback_query) {
      await handleCallback(update.callback_query);
    } else if (update?.message) {
      await handleMessage(update.message);
    }
  } catch (err) {
    console.error("POST /telegram/webhook error:", err);
  }

  res.status(200).json({ ok: true });
});

async function handleCallback(callback: any) {
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
    await updateReviewMessage(chatId, messageId, updated, "approved");
    return;
  }

  if (action === "del") {
    answerCallbackQuery(callback.id, "Eliminando…").catch(() => {});
    const [deleted] = await db
      .delete(reviewsTable)
      .where(eq(reviewsTable.id, id))
      .returning();
    if (!deleted) return;
    await db.delete(telegramPendingEditsTable).where(eq(telegramPendingEditsTable.chatId, String(chatId)));
    await updateReviewMessage(chatId, messageId, deleted, "deleted");
    return;
  }

  if (action === "edit") {
    const [review] = await db.select().from(reviewsTable).where(eq(reviewsTable.id, id));
    if (!review) {
      await answerCallbackQuery(callback.id, "Esa reseña ya no existe");
      return;
    }
    answerCallbackQuery(callback.id, "Enviá el nuevo texto").catch(() => {});
    // Guardamos qué reseña está esperando texto nuevo para este chat. Se
    // sobrescribe si ya había una edición pendiente (solo importa la última).
    await db
      .insert(telegramPendingEditsTable)
      .values({ chatId: String(chatId), reviewId: id })
      .onConflictDoUpdate({
        target: telegramPendingEditsTable.chatId,
        set: { reviewId: id, createdAt: new Date() },
      });
    await sendPlainMessage(
      chatId,
      `✏️ Escribí y enviá el <b>nuevo texto</b> para la reseña de <b>${escapeHtml(review.name)}</b>.\n\nEnviá /cancelar para no cambiar nada.`,
    );
    return;
  }

  await answerCallbackQuery(callback.id, "Acción desconocida");
}

async function handleMessage(message: any) {
  const chatId = message.chat?.id;
  const text: string = (message.text || "").trim();
  if (!chatId || !text) return;

  if (text === "/resenas" || text === "/reviews") {
    const all = await db.select().from(reviewsTable).orderBy(desc(reviewsTable.createdAt));
    if (all.length === 0) {
      await sendPlainMessage(chatId, "No hay reseñas todavía.");
      return;
    }
    const pending = all.filter((r) => !r.approved).length;
    await sendPlainMessage(
      chatId,
      `📋 <b>${all.length}</b> reseña(s) en total — <b>${pending}</b> pendiente(s) de aprobación.`,
    );
    for (const review of all) {
      await sendReviewCard(review);
    }
    return;
  }

  // Cancelar una edición pendiente.
  if (text === "/cancelar") {
    const deleted = await db
      .delete(telegramPendingEditsTable)
      .where(eq(telegramPendingEditsTable.chatId, String(chatId)))
      .returning();
    if (deleted.length > 0) await sendPlainMessage(chatId, "Edición cancelada, no se cambió nada.");
    return;
  }

  // ¿Hay una edición pendiente para este chat? Si sí, este texto es el nuevo
  // contenido de la reseña.
  const [pendingEdit] = await db
    .select()
    .from(telegramPendingEditsTable)
    .where(eq(telegramPendingEditsTable.chatId, String(chatId)));
  if (!pendingEdit) return; // texto suelto que no corresponde a ningún flujo

  const isExpired = Date.now() - new Date(pendingEdit.createdAt).getTime() > EDIT_TIMEOUT_MS;
  await db.delete(telegramPendingEditsTable).where(eq(telegramPendingEditsTable.chatId, String(chatId)));
  if (isExpired) {
    await sendPlainMessage(chatId, "La edición venció por tiempo, tocá ✏️ Editar de nuevo si querés cambiar el texto.");
    return;
  }

  const [updated] = await db
    .update(reviewsTable)
    .set({ review: text })
    .where(eq(reviewsTable.id, pendingEdit.reviewId))
    .returning();
  if (!updated) {
    await sendPlainMessage(chatId, "Esa reseña ya no existe, no se pudo editar.");
    return;
  }
  await sendPlainMessage(chatId, "✅ Texto actualizado.");
  await sendReviewCard(updated);
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default router;
