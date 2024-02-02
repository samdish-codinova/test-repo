import {AuthorService} from "./AuthorService";
import {ArticleService} from "./ArticleService";

export function createServices() {
    return {
        article: new ArticleService(),
        author: new AuthorService()
    }
}

export type Services = ReturnType<typeof createServices>;
