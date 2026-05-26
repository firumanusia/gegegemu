import gamesData from "@/data/games.json";
import categoriesData from "@/data/categories.json";
import type { Game, Category } from "./types";

const games = gamesData as Game[];
const categories = categoriesData as Category[];

const GAMES_BASE_URL =
  process.env.NEXT_PUBLIC_GAMES_BASE_URL?.replace(/\/$/, "") ?? "";

export function resolveGamePath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (!GAMES_BASE_URL) return path;
  return `${GAMES_BASE_URL}${path}`;
}

export function getAllGames(): Game[] {
  return games;
}

export function getFeaturedGames(): Game[] {
  return games.filter((g) => g.featured);
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesByCategory(categorySlug: string): Game[] {
  return games.filter((g) => g.categories.includes(categorySlug));
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function searchGames(query: string): Game[] {
  const q = query.trim().toLowerCase();
  if (!q) return games;
  return games.filter((g) => {
    return (
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some((t) => t.toLowerCase().includes(q)) ||
      g.categories.some((c) => c.toLowerCase().includes(q))
    );
  });
}

export function getRandomGame(): Game {
  return games[Math.floor(Math.random() * games.length)];
}

export function parseAspectRatio(ratio: string): number {
  const [w, h] = ratio.split(":").map(Number);
  if (!w || !h) return 1;
  return w / h;
}
