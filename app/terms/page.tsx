import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of use for ${SITE.name}.`,
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Terms of <span className="text-gradient">Service</span>
      </h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Last updated: {new Date().toISOString().slice(0, 10)}
      </p>

      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[var(--color-text)]/90">
        <p>
          By accessing or using {SITE.domain} (&quot;the site&quot;) you agree to
          the following terms. If you do not agree, please do not use the site.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Use of the site</h2>
        <p>
          The site offers free browser-playable mini games. You may play any
          game shown for personal, non-commercial entertainment. You agree not to:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Attempt to disrupt, overload or attack the site or its infrastructure.</li>
          <li>Use automated tools, scrapers or bots that place undue load on the site.</li>
          <li>Reverse-engineer or repackage the site itself for commercial redistribution.</li>
          <li>Use the site for any unlawful purpose.</li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">Game ownership and licenses</h2>
        <p>
          Games on this site fall into two groups:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>First-party games</strong> created by {SITE.name} —
            available under the MIT License (see source link on each game page).
          </li>
          <li>
            <strong>Third-party open-source games</strong> hosted with proper
            attribution. Each carries its own license (MIT, Unlicense, GPL, etc.)
            shown on its game page along with a link to the original source
            repository. All rights to those works remain with their respective
            authors.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">No warranty</h2>
        <p>
          The site and games are provided <em>&quot;as is&quot;</em>, without warranty of
          any kind. We make no guarantees about uptime, fitness for any
          particular purpose, or the absence of bugs.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {SITE.name} and its operators
          are not liable for any indirect, incidental, special or consequential
          damages arising out of your use of the site.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Third-party content and links</h2>
        <p>
          The site links to third-party repositories and may embed third-party
          analytics. We are not responsible for the content or practices of
          those third parties.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Changes</h2>
        <p>
          We may modify these terms at any time. Continued use of the site
          after a change constitutes acceptance.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p>
          Questions? Reach us via the <a className="text-[var(--color-accent)] hover:underline" href="/contact">contact page</a>.
        </p>
      </div>
    </article>
  );
}
