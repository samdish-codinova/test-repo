import knexInstance from "../db/knex";
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
}
