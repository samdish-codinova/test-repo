import DataLoader from "dataloader";
import { Author } from "model/Author";
import { AuthorService } from "../services/AuthorService";

export const createLoaders = () => {
  const authorService = new AuthorService();

  return {
    authorLoader: new DataLoader<string, Author>((authorIds) =>
      authorService.findManyByIds(authorIds)
    ),
  };
};

export type Loaders = ReturnType<typeof createLoaders>;
