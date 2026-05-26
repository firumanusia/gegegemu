import Link from "next/link";
import {
  getAllGames,
  getFeaturedGames,
  getGamesByCategory,
  getAllCategories,
} from "@/lib/games";
import { GameGrid, FeaturedGrid } from "@/components/GameGrid";

export default function Home() {
  const all = getAllGames();
  const featured = getFeaturedGames();
  const categories = getAllCategories();

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-10">
        <h1
          className="text-3xl font-semibold tracking-tight sm:text-5xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          What are you <span className="text-gradient">playing</span> today?
        </h1>
        <p className="mt-3 max-w-xl text-base text-[var(--color-muted)] sm:text-lg">
          Hand-picked free mini games. No downloads, no sign-ups. Just press play.
        </p>
      </section>

      {featured.length > 0 && (
        <section className="mb-12">
          <SectionHeading title="Featured" />
          <FeaturedGrid games={featured} />
        </section>
      )}

      <section className="mb-12">
        <SectionHeading
          title="All games"
          link={{ href: "/games", label: "Browse all" }}
        />
        <GameGrid games={all} />
      </section>

      {categories.slice(0, 3).map((cat) => {
        const list = getGamesByCategory(cat.slug);
        if (list.length === 0) return null;
        return (
          <section key={cat.slug} className="mb-12">
            <SectionHeading
              title={cat.name}
              link={{
                href: `/categories/${cat.slug}`,
                label: "See all",
              }}
            />
            <GameGrid games={list} />
          </section>
        );
      })}
    </div>
  );
}

function SectionHeading({
  title,
  link,
}: {
  title: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2
        className="text-xl font-semibold sm:text-2xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {title}
      </h2>
      {link && (
        <Link
          href={link.href}
          className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
        >
          {link.label} →
        </Link>
      )}
    </div>
  );
}
