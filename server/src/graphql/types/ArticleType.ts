import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLDate, ObjectTypeComposer } from "graphql-compose";
import { Article } from "../../model/Article";
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
