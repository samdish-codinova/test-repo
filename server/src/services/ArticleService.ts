import {PaginationInput} from "../model/PaginationMeta";
import {Article, ArticleSchema} from "../model/Article";
import {AUTHORS} from "./AuthorService";
import {faker} from "@faker-js/faker";
import {ulid} from "ulid";

const ARTICLES: Article[] = [];
for (let i = 0; i < 1000; i++) {
    ARTICLES.push(
        ArticleSchema.parse({
            id: ulid(),
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(3),
            createdAt: faker.date.past(),
            authorId: getRandomAuthorId()
        })
    )
}

ARTICLES.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

export class ArticleService {
    async findByQuery(query: PaginationInput) {
        return ARTICLES.slice(query.offset, query.offset + query.limit);
    }

    findTotalCount() {
        return ARTICLES.length;
    }
}

function getRandomAuthorId() {
    return faker.helpers.arrayElement(AUTHORS).id;
}
