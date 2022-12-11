import connectionDB from "../server.js";

export async function createGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.games;

  try {
    await connectionDB.query(
      "INSERT INTO games (name, image, stock_total, category_id, price_per_day) VALUES ($1,$2,$3,$4,$5)",
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
