import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reviewsRouter from "./reviews";
import socialLinksRouter from "./social-links";
import contactMessagesRouter from "./contact-messages";
import telegramRouter from "./telegram";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reviewsRouter);
router.use(socialLinksRouter);
router.use(contactMessagesRouter);
router.use(telegramRouter);

export default router;
