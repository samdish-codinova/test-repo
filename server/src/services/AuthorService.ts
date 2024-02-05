import {
  Author,
  AuthorQuery,
  AuthorQuerySchema,
  AuthorSchema,
} from "../model/Author";
import { ulid } from "ulid";
import { faker } from "@faker-js/faker";
import { z } from "zod";

export const AUTHORS = [];
for (let i = 0; i < 100; i++) {
  AUTHORS.push(
    AuthorSchema.parse({
      id: ulid(),
      name: faker.person.fullName(),
      createdAt: faker.date.past(),
      avatar: faker.image.avatarGitHub(),
    })
  );
}

export class AuthorService {
  findByQuery(query: AuthorQuery) {
    const finalQuery = AuthorQuerySchema.parse(query);

    const filter = computeFilterForQuery(finalQuery);
    return new Promise<Author[]>((resolve) => {
      setTimeout(() => {
        resolve(AUTHORS.filter(filter));
      }, 1000);
    }); // simulate network latency
  }

  async findById(id: string) {
    const authors = await this.findByQuery({ id });
    return authors[0];
  }

  async findManyByIds(authorIds: readonly string[]): Promise<Author[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          AUTHORS.filter((author: Author) => authorIds.includes(author.id))
        );
      }, 1500); // Mock the network latency.
    });
  }
}

type AuthorFilter = (author: Author) => boolean;

function computeFilterForQuery(
  query: z.output<typeof AuthorQuerySchema>
): AuthorFilter {
  let filter: AuthorFilter = () => true;
  if (query.id) {
    filter = composeFilters<Author>(filter, (author) => author.id === query.id);
  }
  return filter;
}

function composeFilters<T>(...filters: Array<(input: T) => boolean>) {
  return (input: T) => filters.every((filter) => filter(input));
}
