import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let connectionOptions = {};

if (process.env.MYSQL_URL) {
  connectionOptions = process.env.MYSQL_URL;
} else {
  connectionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  };
}

const pool = mysql.createPool(connectionOptions);

export default pool;