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
