import connectionDB from "../server.js";
export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customers;
  try {
    await connectionDB.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)",
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getCustomers(req, res) {
  try {
    const customers = await connectionDB.query("SELECT * FROM customers");
    res.send(customers.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getCustomersById(req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const idExists = await connectionDB.query(
      "SELECT * FROM customers WHERE id=$1;",
      [id]
    );
    if (!idExists.rows[0]) {
      return res.sendStatus(404);
    }
    res.send(idExists.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateCustomers(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = res.locals.customers;

  try {
    await connectionDB.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;",
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
