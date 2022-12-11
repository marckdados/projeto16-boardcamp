import joi from "joi";

const costumersSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().min(10).max(11).required(),
  cpf: joi
    .string()
    .min(11)
    .max(11)
    .regex(/[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2}/)
    .required(),
  birthday: joi.date().required(),
});

export default costumersSchema;
