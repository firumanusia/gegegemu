import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllGames,
  getGameBySlug,
  getGamesByCategory,
  resolveGamePath,
  getCategoryBySlug,
} from "@/lib/games";
import { GamePlayer } from "@/components/GamePlayer";
import { GameCard } from "@/components/GameCard";
import { ExternalLink, Gamepad2, User, Tag } from "lucide-react";

export async function generateStaticParams() {
  return getAllGames().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return {
    title: game.title,
    description: game.description,
    openGraph: {
      title: `${game.title} · gegegemu`,
      description: game.description,
      images: [game.thumbnail],
    },
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const related = game.categories
    .flatMap((c) => getGamesByCategory(c))
    .filter(
      (g, i, arr) =>
        g.slug !== game.slug && arr.findIndex((x) => x.slug === g.slug) === i,
    )
    .slice(0, 8);

  return (
    <div
      className="mx-auto w-full px-3 py-4 sm:px-6 sm:py-6"
      style={
        {
          // Header (64px) + page padding + controls + meta strip + breathing room.
          // `max(...)` floors the player so very short viewports (landscape phone)
          // still get a usable size; everywhere else it fills the available height.
          "--player-max-h": "max(320px, calc(100dvh - 240px))",
          maxWidth: "min(100%, 1800px)",
        } as React.CSSProperties
      }
    >
      <GamePlayer
        src={resolveGamePath(game.path)}
        title={game.title}
        aspectRatio={game.aspectRatio}
      />

      {/* Compact meta strip — replaces the right sidebar so the game takes full width */}
      <div className="mx-auto mt-4 flex w-full max-w-[1400px] flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1
              className="text-xl font-semibold text-white sm:text-2xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {game.title}
            </h1>
            <div className="flex flex-wrap gap-1.5">
              {game.categories.map((c) => {
                const cat = getCategoryBySlug(c);
                return (
                  <Link
                    key={c}
                    href={`/categories/${c}`}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-2.5 py-0.5 text-xs font-medium text-white transition-colors hover:border-[var(--color-accent)]"
                  >
                    {cat?.name ?? c}
                  </Link>
                );
              })}
            </div>
          </div>
          <p className="mt-1.5 text-sm text-[var(--color-muted)] sm:max-w-3xl">
            {game.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:shrink-0 sm:justify-end">
          <MetaPill icon={<Gamepad2 className="h-3.5 w-3.5" />} text={game.controls} />
          {!isFirstParty(game.author) && (
            <>
              <MetaPill icon={<User className="h-3.5 w-3.5" />} text={game.author} />
              <MetaPill icon={<Tag className="h-3.5 w-3.5" />} text={game.license} />
              <a
                href={game.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-[var(--color-accent)]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Source
              </a>
            </>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-10 w-full max-w-[1600px]">
          <h2
            className="mb-4 text-lg font-semibold sm:text-xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            More like this
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {related.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function isFirstParty(author: string): boolean {
  return author.trim().toLowerCase() === "gegegemu";
}

function MetaPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-1.5 text-xs font-medium text-[var(--color-muted)]"
      title={text}
    >
      <span className="text-[var(--color-accent)]">{icon}</span>
      <span className="max-w-[280px] truncate text-white">{text}</span>
    </span>
  );
}
