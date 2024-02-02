import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {ReactNode} from "react";

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
});


export function AppProvider({children}: { children: ReactNode }) {
    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
}
