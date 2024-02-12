import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { GraphQLDate, ObjectTypeComposer } from "graphql-compose";
import {
  Article,
  ArticleInputSchema,
  ArticleUpdateSchema,
} from "../../model/Article";
import { GraphQLContext } from "../createContext";
import { AuthorType } from "./AuthorType";

export const ArticleType = ObjectTypeComposer.createTemp<
  Article,
  GraphQLContext
>({
  name: "Article",
  fields: {
    id: new GraphQLNonNull(GraphQLID),
    title: new GraphQLNonNull(GraphQLString),
    content: new GraphQLNonNull(GraphQLString),
    createdAt: new GraphQLNonNull(GraphQLDate),
    author: {
      type: AuthorType.NonNull,
      resolve: async (source, _, context) => {
        return await context.loaders.authorLoader.load(source.authorId);
      },
    },
  },
});

ArticleType.addResolver({
  name: "findById",
  type: ArticleType.NonNull,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async ({ context, args }) => {
    if (!args.id) throw new Error("Invalid article id!");

    const article = await context.services.article.findById(args.id);
    if (!article) throw new Error(`Article with id ${args.id} not found!`);

    return article;
  },
});

ArticleType.addResolver({
  name: "createArticle",
  type: ArticleType.NonNull,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    authorId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async ({ context, args }) => {
    const articleData = ArticleInputSchema.parse(args);

    const author = await context.services.author.findById(args.authorId);
    if (!author) throw new Error("Invalid author id");

    const article = await context.services.article.create(articleData);
    if (!article)
      throw new Error("Could not create article. Please try again later!");

    return article;
  },
});

const ArticleUpdateResultType = ObjectTypeComposer.createTemp({
  name: "ArticleUpdateResultType",
  fields: {
    success: new GraphQLNonNull(GraphQLBoolean),
    message: GraphQLString,
  },
});

ArticleType.addResolver({
  name: "updateById",
  type: ArticleUpdateResultType.NonNull,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
  },
  resolve: async ({ context, args }) => {
    const article = ArticleUpdateSchema.parse(args);
    const isUpdated = await context.services.article.update(article, {
      id: article.id,
    });

    return {
      success: isUpdated,
      message: isUpdated
        ? "Article updated successfully"
        : "Could not update article. Please check the provided id for the article",
    };
  },
});

ArticleType.addResolver({
  name: "deleteById",
  type: ArticleType.NonNull,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async ({ context, args }) => {
    const article = await context.services.article.findById(args.id);
    if (!article) throw new Error("Article not found");

    const isDeleted = await context.services.article.delete({ id: article.id });
    if (!isDeleted)
      throw new Error("Could not delete article. Please try again later.");

    return article;
  },
});
