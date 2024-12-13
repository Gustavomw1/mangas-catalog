import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Banco ok");
  })
  .catch((error) => {
    console.log("Erro ao se conectar com o banco");
  });
