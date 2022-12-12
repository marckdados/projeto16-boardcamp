import { Router } from "express";
import {
  createRentals,
  deleteRentals,
  getRentals,
  setReturnRentals,
} from "../controllers/RentalsController.js";
import {
  deleteRentalsValidate,
  rentalsValidate,
  returnRentalsValidate,
} from "../middlewares/RentalsValidate.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", rentalsValidate, createRentals);
rentalsRouter.post(
  "/rentals/:id/return",
  returnRentalsValidate,
  setReturnRentals
);
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.delete("/rentals/:id", deleteRentalsValidate, deleteRentals);

export default rentalsRouter;
