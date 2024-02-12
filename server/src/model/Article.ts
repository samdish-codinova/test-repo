import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
  authorId: z.string(),
});

export type Article = z.output<typeof ArticleSchema>;

export const ArticleInputSchema = z.object({
  title: z.string().min(2).max(255).trim(),
  content: z.string().min(2).max(2048),
  authorId: z.string().uuid(),
});

export type ArticleInput = z.infer<typeof ArticleInputSchema>;
