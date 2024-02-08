import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLDate, ObjectTypeComposer } from "graphql-compose";
import { GraphQLContext } from "graphql/createContext";
import {
  Author,
  AuthorInputSchema,
  GetAuthorInputSchema,
} from "../../model/Author";

export const AuthorType = ObjectTypeComposer.createTemp<Author, GraphQLContext>(
  {
    name: "Author",
    fields: {
      id: new GraphQLNonNull(GraphQLID),
      name: new GraphQLNonNull(GraphQLString),
      createdAt: new GraphQLNonNull(GraphQLDate),
      avatar: new GraphQLNonNull(GraphQLString),
    },
  }
);

AuthorType.addResolver({
  name: "createAuthor",
  type: AuthorType.NonNull,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    avatar: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async ({ args, context }) => {
    const authorData = AuthorInputSchema.parse(args);

    const author = await context.services.author.create(authorData);

    return author;
  },
});

AuthorType.addResolver({
  name: "findById",
  type: AuthorType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async ({ args, context }) => {
    const authorData = GetAuthorInputSchema.parse(args);
    const author = await context.services.author.findById(authorData.id);

    return author;
  },
});
