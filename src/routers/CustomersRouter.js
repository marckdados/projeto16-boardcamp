import { Router } from "express";
import {
  createCustomer,
  getCustomers,
  getCustomersById,
  updateCustomers,
} from "../controllers/CustomersController.js";
import { customersValidate } from "../middlewares/CustomersValidationMiddleware.js";

const customersRouter = Router();

customersRouter.post("/customers", customersValidate, createCustomer);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.put("/customers/:id", customersValidate, updateCustomers);

export default customersRouter;
