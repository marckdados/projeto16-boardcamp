import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const connectionDB = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "admin",
  database: "boardcamp",
});

export default connectionDB;
