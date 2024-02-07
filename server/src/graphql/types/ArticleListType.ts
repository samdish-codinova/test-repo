import { ObjectTypeComposer } from "graphql-compose";
import { ArticleType } from "./ArticleType";
import { PaginationMetaType } from "./PaginationMetaType";
import { GraphQLInt } from "graphql";
import { PaginationInputSchema } from "../../model/PaginationMeta";

export const ArticleListType = ObjectTypeComposer.createTemp({
  name: "ArticleList",
  fields: {
    nodes: ArticleType.NonNull.List.NonNull,
    meta: PaginationMetaType.NonNull,
  },
});

ArticleListType.addResolver({
  name: "findByQuery",
  type: ArticleListType.NonNull,
  args: {
    limit: {
      type: GraphQLInt,
      defaultValue: 10,
    },
    offset: GraphQLInt,
  },
  resolve: async ({ args, context }) => {
    const query = PaginationInputSchema.parse(args);

    return {
      nodes: await context.services.article.findByQuery(query),
      meta: {
        total: await context.services.article.findTotalCount(),
        limit: query.limit,
        offset: query.offset,
      },
    };
  },
});
