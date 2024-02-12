import { randomUUID } from "crypto";
import knexInstance from "../db/knex";
import {
  Article,
  ArticleInput,
  ArticleUpdate,
  ArticleUpdateSchema,
} from "../model/Article";
import { PaginationInput } from "../model/PaginationMeta";

export class ArticleService {
  async findById(id: string) {
    const article = await knexInstance
      .select("*")
      .from("articles")
      .where("id", "=", id);

    return article[0] ?? null;
  }

  async findByQuery(query: PaginationInput) {
    const articlesList = await knexInstance
      .select("*")
      .from("articles")
      .limit(query.limit)
      .offset(query.offset * query.limit);

    return articlesList;
  }

  async findTotalCount() {
    const count = await knexInstance("articles").count({ count: "*" });
    return count?.[0]?.count ?? 0;
  }

  async create(article: Required<ArticleInput>) {
    const articleId = randomUUID();
    await knexInstance.insert({ ...article, id: articleId }).into("articles");

    return this.findById(articleId);
  }

  async update(articleData: ArticleUpdate, updateFilter: ArticleUpdate) {
    const article = ArticleUpdateSchema.parse(articleData);
    const filter = ArticleUpdateSchema.parse(updateFilter);

    const updateResult = await knexInstance("articles")
      .update(article)
      .where(filter);

    return Boolean(updateResult);
  }

  async delete(query: Partial<Article>) {
    const isDelete = await knexInstance("articles").where(query).del();

    return Boolean(isDelete);
  }
}
