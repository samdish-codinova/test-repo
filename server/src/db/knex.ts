import { knex } from "knex";
import knexConfig from "./knexfile";

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

const environment = process.env.NODE_ENV;
const knexInstance = knex(knexConfig[environment]);

export default knexInstance;
