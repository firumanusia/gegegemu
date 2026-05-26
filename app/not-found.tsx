import Link from "next/link";
import { Home, Dices } from "lucide-react";
import { getAllGames, getFeaturedGames, getRandomGame } from "@/lib/games";
import { GameCard } from "@/components/GameCard";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  description: `That page doesn't exist on ${SITE.name} — try a featured game instead.`,
};

export default function NotFound() {
  const featured = getFeaturedGames().slice(0, 6);
  const lucky = getRandomGame();
  void getAllGames; // keep import order stable

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10 sm:px-6 sm:py-16 text-center">
      <p className="text-6xl font-extrabold tracking-tight sm:text-8xl text-gradient">
        404
      </p>
      <h1
        className="mt-4 text-2xl font-semibold sm:text-4xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Lost in the maze
      </h1>
      <p className="mt-3 mx-auto max-w-md text-[var(--color-muted)]">
        That page doesn&apos;t exist. The good news: there are{" "}
        {getAllGames().length}+ other things to play.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ffb627] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          href={`/games/${lucky.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[var(--color-accent)]"
        >
          <Dices className="h-4 w-4" />
          Try a random game
        </Link>
      </div>

      {featured.length > 0 && (
        <section className="mt-14 text-left">
          <h2
            className="mb-4 text-xl font-semibold sm:text-2xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Featured games
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-6">
            {featured.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
