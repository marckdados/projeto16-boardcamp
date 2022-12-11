import customersSchema from "../schemas/CustomersSchema.js";
import connectionDB from "../server.js";

export async function customersValidate(req, res, next) {
  const customer = req.body;
  const { cpf } = customer;

  const { errors } = customersSchema.validate(customer, { abortEarly: false });
  if (errors) {
    return res.sendStatus(400);
  }
  try {
    const cpfExists = await connectionDB.query(
      "SELECT * FROM customers WHERE cpf = $1",
      [cpf]
    );
    if (cpfExists.rows[0]) {
      return res.sendStatus(409);
    }
    res.locals.customers = customer;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  next();
}
