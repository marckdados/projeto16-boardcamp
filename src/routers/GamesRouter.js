import { Router } from "express";
import { createGames } from "../controllers/GamesController.js";
import { GamesValidate } from "../middlewares/GamesValidationMiddlewares.js";

const gamesRouter = Router();

gamesRouter.post("/games", GamesValidate, createGames);

export default gamesRouter;
