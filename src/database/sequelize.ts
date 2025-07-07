import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PORT, DB_PWD, DB_USER } from "../const/appcfg";

export const sequelize = new Sequelize(
  DB_NAME as string,
  DB_USER as string,
  DB_PWD as string,
  {
    host: DB_HOST,
    port: DB_PORT ? Number(DB_PORT) : 5432,
    dialect: "postgres",
    logging: true, // opsional: matikan logging SQL
  }
);
