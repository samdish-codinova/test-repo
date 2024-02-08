import { z } from "zod";

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  avatar: z.string().url(),
});

export type Author = z.output<typeof AuthorSchema>;

export const AuthorQuerySchema = z.object({
  id: z.string().nullish(),
});

export const AuthorInputSchema = z.object({
  name: z.string(),
  avatar: z.string().url(),
});

export type AuthorInputSchema = z.infer<typeof AuthorInputSchema>;

export const GetAuthorInputSchema = z.object({
  id: z.string().uuid(),
});

export type GetAuthorInputSchema = z.infer<typeof GetAuthorInputSchema>;

export type AuthorQuery = z.input<typeof AuthorQuerySchema>;
