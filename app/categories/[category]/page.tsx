import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllCategories,
  getCategoryBySlug,
  getGamesByCategory,
} from "@/lib/games";
import { GameGrid } from "@/components/GameGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE, absoluteUrl } from "@/lib/site";

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
  const count = getGamesByCategory(category).length;
  const lower = cat.name.toLowerCase();
  const title = `Free ${cat.name} Games — Play ${count}+ Online`;
  const description = `Play ${count}+ free ${lower} games online at ${SITE.name}. No downloads, no sign-ups. Hand-picked browser ${lower} games — just press play.`;
  const url = absoluteUrl(`/categories/${cat.slug}`);

  return {
    title,
    description,
    keywords: [
      `${lower} games`,
      `free ${lower} games`,
      `online ${lower} games`,
      `play ${lower}`,
      `${lower} games no download`,
      "browser games",
      "html5 games",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: SITE.name,
    },
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

  // Breadcrumb structured data for category page
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: `${cat.name} games`,
        item: absoluteUrl(`/categories/${cat.slug}`),
      },
    ],
  };

  // ItemList structured data — helps Google understand this is a list of games
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cat.name} games`,
    numberOfItems: games.length,
    itemListElement: games.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/games/${g.slug}`),
      name: g.title,
    })),
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: `${cat.name} games` },
        ]}
      />
      <h1
        className="mb-2 text-2xl font-semibold sm:text-3xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Free {cat.name} <span className="text-gradient">games</span>
      </h1>
      <p className="mb-6 text-sm text-[var(--color-muted)]">
        Play {games.length} free {cat.name.toLowerCase()}{" "}
        {games.length === 1 ? "game" : "games"} online — no downloads, no
        sign-ups.
      </p>
      <GameGrid games={games} />
    </div>
  );
}
