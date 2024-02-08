import { ObjectTypeComposer } from "graphql-compose";
import { PaginationMetaType } from "./PaginationMetaType";
import { AuthorType } from "./AuthorType";
import { GraphQLBoolean, GraphQLInt } from "graphql";
import { PaginationInputSchema } from "../../model/PaginationMeta";

export const AuthorListType = ObjectTypeComposer.createTemp({
  name: "AuthorListType",
  fields: {
    meta: PaginationMetaType.NonNull,
    nodes: AuthorType.NonNull.List.NonNull,
  },
});

AuthorListType.addResolver({
  name: "authorList",
  type: AuthorListType,
  args: {
    offset: {
      type: GraphQLInt,
      defaultValue: 0,
    },
    limit: {
      type: GraphQLInt,
      defaultValue: 10,
    },
  },
  resolve: async ({ args, context }) => {
    const query = PaginationInputSchema.parse(args);
    const authors = await context.services.author.findByQuery(query);
    const total = await context.services.author.getTotalCount();

    return {
      meta: {
        total,
        limit: query.limit,
        offset: query.offset,
      },
      nodes: authors,
    };
  },
});
