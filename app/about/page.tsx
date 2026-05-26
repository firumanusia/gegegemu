import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";
import { getAllGames, getAllCategories } from "@/lib/games";

export const metadata: Metadata = {
  title: `About ${SITE.name}`,
  description: `${SITE.name} is a free mini game portal — no downloads, no sign-ups. Learn about how the site is built and what makes it different.`,
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  const totalGames = getAllGames().length;
  const totalCats = getAllCategories().length;
  const firstParty = getAllGames().filter(
    (g) => g.author.toLowerCase() === "gegegemu",
  ).length;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1
        className="text-3xl font-semibold tracking-tight sm:text-5xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        About <span className="text-gradient">{SITE.name}</span>
      </h1>

      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[var(--color-text)]/90">
        <p>
          {SITE.name} is a no-friction mini game portal. {totalGames} hand-picked
          browser games across {totalCats} categories — puzzles, arcade, racing,
          shooter, strategy and more. No downloads, no installs, no sign-ups.
          Just press play.
        </p>

        <h2 className="mt-8 text-xl font-semibold">What you&apos;ll find here</h2>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>{firstParty} original games</strong> — built in-house by {SITE.name}, released under the MIT License.
          </li>
          <li>
            <strong>Hand-picked open-source classics</strong> — like Gabriele
            Cirulli&apos;s <Link className="text-[var(--color-accent)] hover:underline" href="/games/2048">2048</Link> (MIT)
            and the Suika-style <Link className="text-[var(--color-accent)] hover:underline" href="/games/suika">Fruit Drop</Link> (public domain) —
            each with proper attribution and a link back to the original source.
          </li>
          <li>
            <strong>3D games</strong> built with Three.js for a richer experience without bloated downloads.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">How it&apos;s built</h2>
        <p>
          The portal is a Next.js app deployed on Vercel. Game files are static
          HTML/JS embedded via sandboxed iframes — they load instantly and run
          entirely client-side. No tracking inside the games. No microtransactions.
        </p>
        <p>
          We respect open-source licenses. Every third-party game on the site
          ships with its original LICENSE file preserved, and the game&apos;s detail
          page links back to its upstream repository.
        </p>

        <h2 className="mt-8 text-xl font-semibold">No accounts, no nonsense</h2>
        <p>
          You don&apos;t need to sign up to play anything. Game progress and high
          scores save to your browser&apos;s localStorage — they stay on your
          device. We collect anonymous analytics (page views, country, device
          type) to understand what people enjoy. See our{" "}
          <Link className="text-[var(--color-accent)] hover:underline" href="/privacy">privacy policy</Link> for details.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Get in touch</h2>
        <p>
          Bug reports, suggestions, or want your open-source game included?{" "}
          <Link className="text-[var(--color-accent)] hover:underline" href="/contact">Reach out here</Link>.
        </p>
      </div>
    </article>
  );
}
