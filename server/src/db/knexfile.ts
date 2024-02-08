import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const defaultConfig: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    ...defaultConfig,
  },

  production: {
    ...defaultConfig,
  },
};

export default knexConfig;
