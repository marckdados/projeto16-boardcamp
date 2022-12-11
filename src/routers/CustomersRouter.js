import { Router } from "express";
import { createCustomer } from "../controllers/CustomersController.js";
import { customersValidate } from "../middlewares/CustomersValidationMiddleware.js";

const customersRouter = Router();

customersRouter.post("/customers", customersValidate, createCustomer);

export default customersRouter;
