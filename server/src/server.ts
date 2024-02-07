import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";
import knexInstance from "./config/db";
import { createContext } from "./graphql/createContext";
import { createLoaders } from "./graphql/createLoaders";
import { schema } from "./graphql/schema";
import createDataBaseModels from "./model/createDatabaseModels";
import { createServices } from "./services/createServices";

const services = createServices();
const loaders = createLoaders();
createDataBaseModels(knexInstance);

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
