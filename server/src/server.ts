import {createServices} from "./services/createServices";
import {createContext} from "./graphql/createContext";
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {schema} from './graphql/schema';

const services = createServices();

const server = new ApolloServer({
    schema,
});

startStandaloneServer(server, {
    listen: {
        port: 5000
    },
    async context() {
        return createContext(services);
    }
})
    .then(({url}) => {
        console.log(`🚀 Server ready at ${url}`);
    })

