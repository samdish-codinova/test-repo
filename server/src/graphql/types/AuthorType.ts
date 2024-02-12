import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { GraphQLDate, ObjectTypeComposer } from "graphql-compose";
import { GraphQLContext } from "graphql/createContext";
import {
  Author,
  AuthorInputSchema,
  AuthorUpdateSchema,
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

AuthorType.addResolver({
  name: "findAll",
  type: AuthorType.NonNull.List.NonNull,
  resolve: async ({ context }) => {
    const authors = await context.services.author.findAll();

    return authors ?? [];
  },
});

const AuthorUpdateResultType = ObjectTypeComposer.createTemp({
  name: "AuthorUpdateResultType",
  fields: {
    success: new GraphQLNonNull(GraphQLBoolean),
    message: GraphQLString,
  },
});

AuthorType.addResolver({
  name: "updateById",
  type: AuthorUpdateResultType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLString,
    },
    avatar: {
      type: GraphQLString,
    },
  },
  resolve: async ({ args, context }) => {
    const authorData = AuthorUpdateSchema.parse(args);
    const updated = await context.services.author.update(authorData, {
      id: authorData.id,
    });

    return {
      success: updated,
      message: updated
        ? "Author updated successfully"
        : "Could not update author. Please check the provided id for the author",
    };
  },
});

AuthorType.addResolver({
  name: "deleteById",
  type: AuthorType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async ({ args, context }) => {
    const author = await context.services.author.findById(args.id);
    if (!author) throw new Error("Author does not exist");

    const isDeleted = await context.services.author.delete({ id: args.id });
    if (!isDeleted)
      throw new Error("Could not delete author. Please try again later");

    return author;
  },
});
