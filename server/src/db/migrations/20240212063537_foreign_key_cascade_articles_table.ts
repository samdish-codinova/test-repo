import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("articles", (table) => {
    table.dropForeign("authorId");
    table
      .foreign("authorId")
      .references("authors.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("articles").dropTableIfExists("authors");
}
