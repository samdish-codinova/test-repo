import {z} from "zod";

export const AuthorSchema = z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.date(),
    avatar: z.string().url()
})

export type Author = z.output<typeof AuthorSchema>;

export const AuthorQuerySchema = z.object({
    id: z.string().nullish()
});

export type AuthorQuery = z.input<typeof AuthorQuerySchema>;
