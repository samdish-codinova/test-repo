import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import "dotenv/config";
import knexInstance from "./db";

const seed = async () => {
  const AUTHORS = [];
  const ARTICLES = [];

  await knexInstance("articles").del();
  await knexInstance("authors").del();

  for (let i = 0; i < 100; i++) {
    AUTHORS.push({
      id: randomUUID(),
      name: faker.person.fullName(),
      createdAt: faker.date.past(),
      avatar: faker.image.avatarGitHub(),
    });
  }

  for (let i = 0; i < 1000; i++) {
    ARTICLES.push({
      id: randomUUID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      createdAt: faker.date.past(),
      authorId: faker.helpers.arrayElement(AUTHORS).id,
    });
  }

  await knexInstance.batchInsert("authors", AUTHORS);
  await knexInstance.batchInsert("articles", ARTICLES);
  console.log("Database seeding completed!");
};

seed();
