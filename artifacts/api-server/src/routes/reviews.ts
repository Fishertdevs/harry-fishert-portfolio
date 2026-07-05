import { Router, type IRouter } from "express";
import { db, reviewsTable, insertReviewSchema } from "@workspace/db";
import { desc, eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/reviews", async (_req, res) => {
  const rows = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.approved, true))
    .orderBy(desc(reviewsTable.createdAt));
  res.json(rows);
});

router.post("/reviews", async (req, res) => {
  const parsed = insertReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [created] = await db.insert(reviewsTable).values(parsed.data).returning();
  res.status(201).json(created);
});

export default router;
