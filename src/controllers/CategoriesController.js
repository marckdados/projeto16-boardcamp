import connectionDB from "../server.js";

export async function createCategory(req, res) {
  const { name } = res.locals.categories;
  try {
    await connectionDB.query("INSERT INTO categories (name) VALUES ($1)", [
      name,
    ]);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await connectionDB.query("SELECT * FROM categories");
    res.send(categories.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
