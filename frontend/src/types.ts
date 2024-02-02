export type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export type Meta = {
  limit: number;
  offset: number;
  total: number;
};
