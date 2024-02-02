import {Services} from "../services/createServices";

export function createContext(services: Services) {
    return {services};
}

export type GraphQLContext = ReturnType<typeof createContext>;
