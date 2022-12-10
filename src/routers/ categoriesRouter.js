import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/CategoriesController.js";
import { categoryValidate } from "../middlewares/categoriesValidationMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", categoryValidate, createCategory);

export default categoriesRouter;
