import { Router } from "express";
import categoriesRouter from "./ categoriesRouter.js";
import customersRouter from "./CustomersRouter.js";
import gamesRouter from "./GamesRouter.js";

const router = Router();
router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);

export default router;
