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
      type: AuthorType,
      resolve: async (source, _, ctx) => {
        return await ctx.loaders.authorLoader.load(source.authorId);
      },
    },
  },
});
