import { Router, type IRouter } from "express";
import { db, socialLinksTable } from "@workspace/db";
import { asc, eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/social-links", async (_req, res) => {
  const rows = await db
    .select()
    .from(socialLinksTable)
    .where(eq(socialLinksTable.active, true))
    .orderBy(asc(socialLinksTable.displayOrder));
  res.json(rows);
});

export default router;
