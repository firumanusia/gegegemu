import type { ReactNode } from "react";
import { posts } from "@/content/blog";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  tags: string[];
  /** Stable hex for the post's accent (used in cards / OG image) */
  accent: string;
  /** Roughly minutes to read — shown on the card */
  readingTime: number;
  /** Renders the full post body */
  body: () => ReactNode;
};

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, n = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      overlap: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, n)
    .map((x) => x.post);
}
