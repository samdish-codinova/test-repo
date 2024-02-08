import { SchemaComposer } from "graphql-compose";
import { ArticleListType } from "./types/ArticleListType";
import { AuthorType } from "./types/AuthorType";

export function createSchema() {
  const composer = new SchemaComposer();

  composer.Query.addFields({
    articleList: ArticleListType.getResolver("findByQuery"),
    getAuthor: AuthorType.getResolver("findById"),
  });

  composer.Mutation.addFields({
    createAuthor: AuthorType.getResolver("createAuthor"),
    updateAuthor: AuthorType.getResolver("updateById"),
  });

  return composer.buildSchema();
}
