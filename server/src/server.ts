import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";
import { createContext } from "./graphql/createContext";
import { createLoaders } from "./graphql/createLoaders";
import { schema } from "./graphql/schema";
import { createServices } from "./services/createServices";

const services = createServices();
const loaders = createLoaders();

const server = new ApolloServer({
  schema,
});

startStandaloneServer(server, {
  listen: {
    port: 5000,
  },
  async context() {
    return createContext(services, loaders);
  },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
