import { Router, type IRouter } from "express";
import { db, contactMessagesTable, insertContactMessageSchema } from "@workspace/db";

const router: IRouter = Router();

router.post("/contact-messages", async (req, res) => {
  const parsed = insertContactMessageSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [created] = await db.insert(contactMessagesTable).values(parsed.data).returning();
  res.status(201).json(created);
});

export default router;
