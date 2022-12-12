import joi from "joi";

const rentalsShema = joi.object({
  customer_id: joi.number().required(),
  game_id: joi.number().required(),
  days_rented: joi.number().required(),
});

export default rentalsShema;
