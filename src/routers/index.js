import { Router } from "express";
import categoriesRouter from "./ categoriesRouter.js";
import gamesRouter from "./GamesRouter.js";

const router = Router();
router.use(categoriesRouter);
router.use(gamesRouter);

export default router;
