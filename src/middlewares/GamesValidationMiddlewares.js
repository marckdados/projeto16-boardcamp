import gamesSchema from "../schemas/GamesSchema.js";
import connectionDB from "../server.js";

export async function GamesValidate(req, res, next) {
  const { name, stockTotal, pricePerDay, categoryId } = req.body;

  const { error } = gamesSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.sendStatus(400);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  if (!stockTotal > 0 && !pricePerDay > 0) {
    console.log("aqui");
    return res.sendStatus(400);
  }
  try {
    const gameExists = await connectionDB.query(
      "SELECT * FROM games WHERE name=$1",
      [name]
    );
    if (gameExists.rows[0]) {
      return res.sendStatus(409);
    }
    const categoryExists = await connectionDB.query(
      "SELECT * FROM categories WHERE id=$1",
      [categoryId]
    );
    if (!categoryExists.rows[0]) {
      return res.sendStatus(400);
    }
    res.locals.games = req.body;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  next();
}
