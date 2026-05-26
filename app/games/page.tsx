import { getAllGames, searchGames } from "@/lib/games";
import { GameGrid } from "@/components/GameGrid";

export const metadata = {
  title: "Browse games",
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q = "", sort = "" } = await searchParams;
  let games = q ? searchGames(q) : getAllGames();

  if (sort === "new") {
    games = [...games].sort((a, b) =>
      b.addedAt.localeCompare(a.addedAt),
    );
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
