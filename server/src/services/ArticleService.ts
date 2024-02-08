import knexInstance from "../db/knex";
import { PaginationInput } from "../model/PaginationMeta";

export class ArticleService {
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
