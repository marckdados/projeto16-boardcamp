import dayjs from "dayjs";
import connectionDB from "../server.js";

export async function createRentals(req, res) {
  const rental = res.locals.rentals;
  const game = res.locals.games;
  const { customer_id, game_id, days_rented } = rental;
  const rent_date = dayjs().format("YYYY-MM-DD");
  //console.log(game, customer, rental);
  const original_price = rental.days_rented * game.price_per_day;
  try {
    await connectionDB.query(
      "INSERT INTO rentals (customer_id, game_id, days_rented, rent_date, original_price, return_date, delay_fee) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [customer_id, game_id, days_rented, rent_date, original_price, null, null]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getRentals(req, res) {
  try {
    const rentals = await connectionDB.query("SELECT * FROM rentals JOIN ");
    console.log(rentals.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteRentals(req, res) {
  const { id } = req.params;

  try {
    await connectionDB.query("DELETE FROM rentals WHERE id=$1", [id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function setReturnRentals(req, res) {
  const { id } = req.params;
  const rental = res.locals.rentals;
  let return_date = dayjs();
  const interval =
    return_date.diff(rental.rent_date, "day") - rental.days_rented;
  let delay_fee = null;

  if (interval > 0) {
    delay_fee = interval * rental.original_price;
  }
  try {
    await connectionDB.query(
      "UPDATE rentals SET return_date=$1, delay_fee=$2 WHERE id=$3",
      [return_date.format("YYYY-MM-DD"), delay_fee, id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
