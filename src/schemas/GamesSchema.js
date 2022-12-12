import joi from "joi";

const gamesSchema = joi.object({
  name: joi.string(),
  image: joi.string(),
  stock_total: joi.number(),
  category_id: joi.number(),
  pricePer_day: joi.number(),
});

export default gamesSchema;
