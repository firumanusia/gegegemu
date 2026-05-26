import type { Metadata } from "next";
import { getAllGames, searchGames } from "@/lib/games";
import { GameGrid } from "@/components/GameGrid";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Free Online Games — Browse the Catalog",
  description: `Browse all ${getAllGames().length}+ free mini games at ${SITE.name}. Puzzles, arcade, racing, shooter, strategy and more. No downloads, no sign-ups.`,
  alternates: { canonical: absoluteUrl("/games") },
  openGraph: {
    title: `All Free Online Games — ${SITE.name}`,
    description: `Browse ${getAllGames().length}+ free browser games.`,
    url: absoluteUrl("/games"),
    siteName: SITE.name,
    type: "website",
  },
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q = "", sort = "" } = await searchParams;
  let games = q ? searchGames(q) : getAllGames();

  if (sort === "new") {
    games = [...games].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  } else if (sort === "popular") {
    games = [...games].sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  const heading = q
    ? `Results for “${q}”`
    : sort === "new"
      ? "New games"
      : sort === "popular"
        ? "Popular games"
        : sort === "recent"
          ? "Recently played"
          : "All games";

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10">
      <h1
        className="mb-2 text-2xl font-semibold sm:text-3xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {heading}
      </h1>
      <p className="mb-6 text-sm text-[var(--color-muted)]">
        {games.length} {games.length === 1 ? "game" : "games"}
      </p>
      <GameGrid games={games} />
    </div>
  );
}
