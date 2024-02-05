import { Services } from "../services/createServices";
import { Loaders } from "./createLoaders";

export function createContext(services: Services, loaders: Loaders) {
  return {
    services,
    loaders,
  };
}

export type GraphQLContext = ReturnType<typeof createContext>;
