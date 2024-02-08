import { SchemaComposer } from "graphql-compose";
import { ArticleListType } from "./types/ArticleListType";
import { AuthorType } from "./types/AuthorType";
import { AuthorListType } from "./types/AuthorListType";

export function createSchema() {
  const composer = new SchemaComposer();

  composer.Query.addFields({
    articleList: ArticleListType.getResolver("findByQuery"),
    getAuthor: AuthorType.getResolver("findById"),
    authorList: AuthorListType.getResolver("authorList"),
  });

  composer.Mutation.addFields({
    createAuthor: AuthorType.getResolver("createAuthor"),
    updateAuthor: AuthorType.getResolver("updateById"),
  });

  return composer.buildSchema();
}
