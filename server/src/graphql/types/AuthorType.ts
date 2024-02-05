import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLDate, ObjectTypeComposer } from "graphql-compose";
import { GraphQLContext } from "graphql/createContext";
import { Author } from "model/Author";

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
