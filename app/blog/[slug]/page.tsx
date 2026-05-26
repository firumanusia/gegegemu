import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE, absoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: SITE.name,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [SITE.author],
      tags: post.tags,
      images: [{ url: "/og", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const url = absoluteUrl(`/blog/${post.slug}`);

  // Article schema for rich-result eligibility
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: SITE.author, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon") },
    },
    keywords: post.tags.join(", "),
    image: [absoluteUrl("/og")],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en",
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const Body = post.body;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.readingTime} min read</span>
          {post.tags.length > 0 && (
            <>
              <span>·</span>
              <span className="text-[var(--color-accent)]">
                {post.tags.slice(0, 3).join(" · ")}
              </span>
            </>
          )}
        </div>

        <h1
          className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            letterSpacing: "-0.02em",
          }}
        >
          {post.title}
        </h1>
        <p className="mt-4 text-base text-[var(--color-muted)] sm:text-lg">
          {post.description}
        </p>
      </header>

      {/* Article body — styled inline so the post writer doesn't need to remember Tailwind classes */}
      <div className="post-body space-y-5 text-[16px] leading-[1.7] text-[var(--color-text)]/90">
        <Body />
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--color-muted)]">
          Found this useful? Share it.
        </p>
        <ShareButtons url={url} title={post.title} slug={post.slug} />
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2
            className="mb-4 text-xl font-semibold sm:text-2xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            More from the blog
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group flex flex-col gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
              >
                <div
                  className="h-1 w-10 rounded-full"
                  style={{ background: r.accent }}
                />
                <h3 className="text-sm font-semibold leading-snug text-white">
                  {r.title}
                </h3>
                <p className="line-clamp-2 text-xs text-[var(--color-muted)]">
                  {r.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
