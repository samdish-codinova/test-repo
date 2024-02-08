import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("authors", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.string("name");
      table.string("avatar");
      table.dateTime("createdAt").defaultTo(knex.fn.now());
    })
    .createTable("articles", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.string("title");
      table.string("content", 2048);
      table.uuid("authorId");
      table.foreign("authorId").references("authors.id");
      table.dateTime("createdAt").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("articles").dropTableIfExists("");
}
