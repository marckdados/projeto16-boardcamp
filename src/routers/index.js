import { Router } from "express";
import categoriesRouter from "./ categoriesRouter.js";
import customersRouter from "./CustomersRouter.js";
import gamesRouter from "./GamesRouter.js";
import rentalsRouter from "./RentalsRouter.js";

const router = Router();
router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;
