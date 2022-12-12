import rentalsShema from "../schemas/RentalsSchema.js";
import connectionDB from "../server.js";

export async function rentalsValidate(req, res, next) {
  const rental = req.body;

  const { error } = rentalsShema.validate(rental, { abortEarly: false });

  if (error) {
    return res.sendStatus(400);
  }

  const { customer_id, game_id, days_rented } = rental;

  if (days_rented <= 0) {
    return res.sendStatus(400);
  }
  try {
    const customerExists = await connectionDB.query(
      "SELECT * FROM customers WHERE id=$1",
      [customer_id]
    );
    const gameExists = await connectionDB.query(
      "SELECT * FROM games WHERE id=$1",
      [game_id]
    );
    if (!customerExists.rows[0] || !gameExists.rows[0]) {
      return res.sendStatus(400);
    }
    res.locals.rentals = rental;
    res.locals.games = gameExists.rows[0];
    res.locals.customers = customerExists.rows[0];
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  next();
}

export async function deleteRentalsValidate(req, res, next) {
  const { id } = req.params;
  try {
    const rentalsExists = await connectionDB.query(
      "SELECT * FROM rentals WHERE id=$1;",
      [id]
    );
    if (!rentalsExists.rows[0]) {
      return res.sendStatus(404);
    }
    if (rentalsExists.rows[0].return_date === null) {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

  next();
}

export async function returnRentalsValidate(req, res, next) {
  const { id } = req.params;
  try {
    const idExists = await connectionDB.query(
      "SELECT * FROM rentals WHERE id=$1;",
      [id]
    );
    if (!idExists.rows[0]) {
      return res.sendStatus(404);
    }
    if (idExists.rows[0].return_date !== null) {
      return res.sendStatus(400);
    }
    res.locals.rentals = idExists.rows[0];
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  next();
}
