import type { MetadataRoute } from "next";
import { getAllGames, getAllCategories } from "@/lib/games";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE.url}/games`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map(
    (cat) => ({
      url: `${SITE.url}/categories/${cat.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const gameRoutes: MetadataRoute.Sitemap = getAllGames().map((game) => ({
    url: `${SITE.url}/games/${game.slug}`,
    lastModified: new Date(game.addedAt),
    changeFrequency: "monthly",
    priority: game.featured ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...gameRoutes];
}
