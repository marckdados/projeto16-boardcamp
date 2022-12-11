import joi from "joi";

const gamesSchema = joi.object({
  name: joi.string(),
  image: joi.string(),
  stockTotal: joi.number(),
  categoryId: joi.number(),
  pricePerDay: joi.number(),
});

export default gamesSchema;
