import { ObjectTypeComposer, GraphQLDate } from "graphql-compose";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLContext } from "../createContext";
import { Article } from "../../model/Article";
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
        return await ctx.services.author.findById(source.authorId);
      },
    },
  },
});
