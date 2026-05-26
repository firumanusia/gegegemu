import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { SITE, absoluteUrl } from "@/lib/site";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name} — bug reports, suggestions and game submissions.`,
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <h1
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Get in <span className="text-gradient">touch</span>
      </h1>
      <p className="mt-3 text-base text-[var(--color-muted)]">
        Bug reports, suggestions, game submissions, partnership, anything.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href="https://github.com/firumanusia/gegegemu/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_10px_30px_-10px_rgba(255,107,53,0.4)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#ffb627]">
              <GitHubIcon className="h-5 w-5 text-white" />
            </span>
            <h2 className="text-lg font-semibold text-white">GitHub issues</h2>
          </div>
          <p className="text-sm text-[var(--color-muted)]">
            Fastest way to report a bug or suggest a feature. Public, tracked, transparent.
          </p>
        </a>

        <a
          href="mailto:hello@gegegemu.com"
          className="group flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_10px_30px_-10px_rgba(255,107,53,0.4)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#ffb627]">
              <Mail className="h-5 w-5 text-white" />
            </span>
            <h2 className="text-lg font-semibold text-white">Email</h2>
          </div>
          <p className="text-sm text-[var(--color-muted)]">
            hello@{SITE.domain} — for partnerships, takedowns, or anything not
            suited to a public issue.
          </p>
        </a>
      </div>

      <section className="mt-12 space-y-4 text-[15px] leading-relaxed text-[var(--color-text)]/90">
        <h2 className="text-xl font-semibold">Submitting a game</h2>
        <p>
          If you&apos;ve made a browser game and want it on {SITE.name}, open a GitHub
          issue or email us with:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>A link to the playable game (must run as static HTML, no backend required)</li>
          <li>The repository (with a permissive license — MIT, Apache 2.0, BSD, Unlicense, CC0, or similar)</li>
          <li>A one-line description and suggested category</li>
        </ul>
        <p>
          We can&apos;t accept games with proprietary assets, missing licenses, or
          server dependencies. Original art and code only.
        </p>

        <h2 className="mt-8 text-xl font-semibold">DMCA / takedown</h2>
        <p>
          If you believe content on this site infringes your rights, email{" "}
          <a className="text-[var(--color-accent)] hover:underline" href="mailto:hello@gegegemu.com">hello@{SITE.domain}</a> with:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Your name and contact details</li>
          <li>A link to the work you believe was infringed</li>
          <li>The URL on this site of the allegedly infringing material</li>
          <li>A good-faith statement that the use is unauthorised</li>
        </ul>
        <p>
          We act on legitimate requests within 5 business days.
        </p>
      </section>
    </article>
  );
}
