import "dotenv/config";
import { knex } from "knex";

declare module "knex/types/tables" {
  interface Author {
    id: string;
    name: string;
    avatar: string;
    createdAt: Date;
  }

  interface Article {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    authorId: number;
  }

  interface Tables {
    authors: Author;
    articles: Article;
  }
}

const knexInstance = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

export default knexInstance;
