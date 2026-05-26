export type Game = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  path: string;
  categories: string[];
  tags: string[];
  controls: string;
  sourceUrl: string;
  license: string;
  author: string;
  aspectRatio: string;
  featured: boolean;
  addedAt: string;
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
};
