import {z} from "zod";

export const ArticleSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.date(),
    authorId: z.string()
})

export type Article = z.output<typeof ArticleSchema>;
