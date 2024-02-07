import { Knex } from "knex";

/**
 * @param knexInstance - Knex instance
 * @desc  Creates tables in the DB if not already exists.
 */
const createDataBaseModels = async (knexInstance: Knex<any, unknown[]>) => {
  /* AUTHORS */
  await knexInstance.schema.hasTable("authors").then((exists) => {
    if (!exists) {
      return knexInstance.schema.createTable("authors", (table) => {
        table.uuid("id").primary().defaultTo(knexInstance.fn.uuid());
        table.string("name");
        table.string("avatar");
        table.dateTime("createdAt").defaultTo(knexInstance.fn.now());
      });
    }
  });

  /* ARTICLES */
  await knexInstance.schema.hasTable("articles").then((exists) => {
    if (!exists) {
      return knexInstance.schema.createTable("articles", (table) => {
        table.uuid("id").primary().defaultTo(knexInstance.fn.uuid());
        table.string("title");
        table.string("content", 2048);
        table.uuid("author");
        table.foreign("author").references("authors.id");
        table.dateTime("createdAt").defaultTo(knexInstance.fn.now());
      });
    }
  });
};

export default createDataBaseModels;
