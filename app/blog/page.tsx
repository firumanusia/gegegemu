import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Game guides, strategy & lists",
  description: `Game guides, strategy tips, and curated lists of the best free browser games on ${SITE.name}.`,
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    title: `Blog — ${SITE.name}`,
    description: "Game guides, strategy tips, and curated lists.",
    url: absoluteUrl("/blog"),
    siteName: SITE.name,
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  // ItemList JSON-LD for the blog index
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} blog`,
    url: absoluteUrl("/blog"),
    description: "Game guides, strategy and lists.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.publishedAt,
      keywords: p.tags.join(", "),
    })),
  };

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <header className="mb-10">
        <h1
          className="text-3xl font-semibold tracking-tight sm:text-5xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          The <span className="text-gradient">gegegemu</span> blog
        </h1>
        <p className="mt-3 max-w-xl text-base text-[var(--color-muted)]">
          Game guides, strategy tips, and curated lists. Updated as new games
          land in the catalog.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-5 transition-all hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_18px_44px_-20px_rgba(255,107,53,0.45)]"
          >
            <div
              className="h-1.5 w-12 rounded-full"
              style={{ background: p.accent }}
            />
            <h2
              className="text-lg font-semibold leading-snug text-white sm:text-xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {p.title}
            </h2>
            <p className="text-sm text-[var(--color-muted)] line-clamp-3">
              {p.description}
            </p>
            <div className="mt-auto flex items-center justify-between text-xs text-[var(--color-muted)]">
              <time dateTime={p.publishedAt}>
                {new Date(p.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <span>{p.readingTime} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
