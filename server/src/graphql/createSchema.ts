import {SchemaComposer} from "graphql-compose";
import {ArticleListType} from "./types/ArticleListType";

export function createSchema() {
    const composer = new SchemaComposer();

    composer.Query.addFields({
        articleList: ArticleListType.getResolver('findByQuery'),
    })

    return composer.buildSchema();
}
