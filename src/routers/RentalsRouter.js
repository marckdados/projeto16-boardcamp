import { Router } from "express";
import { createRentals } from "../controllers/RentalsController.js";
import { rentalsValidate } from "../middlewares/RentalsValidate.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", rentalsValidate, createRentals);

export default rentalsRouter;
