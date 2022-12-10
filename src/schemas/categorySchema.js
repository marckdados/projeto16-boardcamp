import joi from "joi";

const categorySchema = joi.object({
  name: joi.string(),
});

export default categorySchema;
