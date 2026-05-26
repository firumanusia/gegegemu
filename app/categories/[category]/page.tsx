import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllCategories,
  getCategoryBySlug,
  getGamesByCategory,
} from "@/lib/games";
import { GameGrid } from "@/components/GameGrid";

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.name} games`,
    description: `Play free ${cat.name.toLowerCase()} games online.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();
  const games = getGamesByCategory(category);

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10">
      <h1
        className="mb-2 text-2xl font-semibold sm:text-3xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {cat.name} <span className="text-gradient">games</span>
      </h1>
      <p className="mb-6 text-sm text-[var(--color-muted)]">
        {games.length} {games.length === 1 ? "game" : "games"}
      </p>
      <GameGrid games={games} />
    </div>
  );
}
