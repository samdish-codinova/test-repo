import { SchemaComposer } from "graphql-compose";
import { ArticleListType } from "./types/ArticleListType";
import { ArticleType } from "./types/ArticleType";
import { AuthorListType } from "./types/AuthorListType";
import { AuthorType } from "./types/AuthorType";

export function createSchema() {
  const composer = new SchemaComposer();

  composer.Query.addFields({
    getArticle: ArticleType.getResolver("findById"),
    articleList: ArticleListType.getResolver("findByQuery"),
    getAuthor: AuthorType.getResolver("findById"),
    authorList: AuthorListType.getResolver("authorList"),
  });

  composer.Mutation.addFields({
    createArticle: ArticleType.getResolver("createArticle"),
    deleteArticle: ArticleType.getResolver("deleteById"),
    createAuthor: AuthorType.getResolver("createAuthor"),
    updateAuthor: AuthorType.getResolver("updateById"),
    deleteAuthor: AuthorType.getResolver("deleteById"),
  });

  return composer.buildSchema();
}
