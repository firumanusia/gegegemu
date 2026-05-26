import { GameCard } from "./GameCard";
import type { Game } from "@/lib/types";

export function GameGrid({ games }: { games: Game[] }) {
  if (games.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/40 px-6 py-16 text-center">
        <p className="text-base font-medium text-white">No games found</p>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Try a different search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {games.map((game, i) => (
        <GameCard key={game.slug} game={game} priority={i < 6} />
      ))}
    </div>
  );
}

export function FeaturedGrid({ games }: { games: Game[] }) {
  if (games.length === 0) return null;
  const [hero, ...rest] = games;
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {/* Big hero tile spans 2x2 on md+ */}
      <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2">
        <FeaturedHeroCard game={hero} />
      </div>
      {rest.slice(0, 4).map((g) => (
        <GameCard key={g.slug} game={g} />
      ))}
    </div>
  );
}

function FeaturedHeroCard({ game }: { game: Game }) {
  return (
    <a
      href={`/games/${game.slug}`}
      className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface)] p-5 transition-all hover:-translate-y-1 hover:border-[var(--color-accent)]/60 hover:shadow-[0_20px_50px_-15px_rgba(255,107,53,0.6)] md:min-h-[400px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
        style={{
          backgroundImage: `url(${game.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px) saturate(1.4)",
        }}
      />
      <div className="relative z-10 flex-1 flex flex-col">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ffb627] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
          Featured
        </span>
        <div className="mt-auto">
          <h2
            className="text-2xl font-semibold text-white md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {game.title}
          </h2>
          <p className="mt-2 max-w-md text-sm text-slate-300 md:text-base">
            {game.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold transition-transform group-hover:scale-105">
            Play now →
          </span>
        </div>
      </div>
    </a>
  );
}
