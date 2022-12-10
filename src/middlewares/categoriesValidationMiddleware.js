import categorySchema from "../schemas/categorySchema.js";
import connectionDB from "../server.js";
export async function categoryValidate(req, res, next) {
  const category = req.body;

  if (!category) {
    return res.sendStatus(400);
  }

  const { err } = categorySchema.validate(category, { abortEarly: false });
  if (err) {
    const errors = err.details.map((error) => error.message);
    return res.status(400).send(errors);
  }
  try {
    const categoryExists = await connectionDB.query(
      "SELECT * FROM categories WHERE name = $1",
      [category.name]
    );
    if (categoryExists.rows[0]) {
      return res.sendStatus(409);
    }

    res.locals.categories = category;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  next();
}
