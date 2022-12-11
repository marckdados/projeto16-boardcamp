import { Router } from "express";
import { createGames, getGames } from "../controllers/GamesController.js";
import { GamesValidate } from "../middlewares/GamesValidationMiddlewares.js";

const gamesRouter = Router();

gamesRouter.post("/games", GamesValidate, createGames);
gamesRouter.get("/games", getGames);
export default gamesRouter;
