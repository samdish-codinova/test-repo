import { faker } from "@faker-js/faker";
import { ulid } from "ulid";
import { z } from "zod";
import knexInstance from "../db/knex";
import {
  Author,
  AuthorQuery,
  AuthorQuerySchema,
  AuthorSchema,
} from "../model/Author";

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
    const shuffledAuthors = await knexInstance
      .select("*")
      .from("authors")
      .whereIn("id", authorIds);

    // Result may be not same as "authorIds" array, so arrange elements of "shuffledAuthors" like "authorIds" for caching.
    for (let i = 0; i < authorIds.length; i++) {
      const authorId = authorIds[i];

      const shuffledIndex = shuffledAuthors.findIndex(
        (author) => author.id === authorId
      );

      const temp = shuffledAuthors[shuffledIndex];
      shuffledAuthors[shuffledIndex] = shuffledAuthors[i];
      shuffledAuthors[i] = temp;
    }

    return shuffledAuthors;
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
