type Author = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

export type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: Author;
};

export type Meta = {
  limit: number;
  offset: number;
  total: number;
};
