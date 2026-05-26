import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy practices for ${SITE.name} — how we handle data, cookies and third-party services.`,
  alternates: { canonical: absoluteUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14 prose prose-invert">
      <h1
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Privacy <span className="text-gradient">Policy</span>
      </h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Last updated: {new Date().toISOString().slice(0, 10)}
      </p>

      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[var(--color-text)]/90">
        <p>
          {SITE.name} (&quot;we&quot;, &quot;our&quot;, &quot;the site&quot;) values your
          privacy. This page describes what data is collected when you visit{" "}
          {SITE.domain}, how it is used, and what choices you have.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Information we collect</h2>
        <p>
          We do <strong>not</strong> ask you to sign up or create an account.
          The site collects only what is needed to keep it running and to
          understand how visitors use it:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>Analytics data</strong> — anonymous page views, referrer, country, browser/OS, and
            generic device class via <em>Google Analytics 4</em> and{" "}
            <em>Vercel Analytics</em>. No personally-identifying information is collected.
          </li>
          <li>
            <strong>Local game saves</strong> — high scores, progress and
            preferences saved by individual games via <em>localStorage</em> on
            your own device. We never transmit this data off your browser.
          </li>
          <li>
            <strong>Server access logs</strong> — standard request logs (IP,
            timestamp, URL, user agent) kept by our hosting provider Vercel for
            up to 30 days, used for abuse prevention.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">Cookies and similar technologies</h2>
        <p>
          The site uses a small number of cookies and equivalents:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>Analytics cookies</strong> set by Google Analytics for
            measurement (e.g., <code>_ga</code>, <code>_ga_*</code>).
          </li>
          <li>
            <strong>Browser localStorage</strong> for game progress and high
            scores.
          </li>
        </ul>
        <p>
          You can disable cookies in your browser settings or use an extension
          to block analytics scripts; the games themselves will keep working.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Third-party services</h2>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>Vercel</strong> — hosting and CDN. See{" "}
            <a className="text-[var(--color-accent)] hover:underline" href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel&apos;s privacy policy</a>.
          </li>
          <li>
            <strong>Google Analytics</strong> — usage measurement. See{" "}
            <a className="text-[var(--color-accent)] hover:underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s privacy policy</a>.
          </li>
          <li>
            <strong>Games hosted in iframes</strong> — most third-party games on
            this site are MIT/public-domain projects. They run sandboxed in your
            browser and may use localStorage for save data.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">Advertising (planned)</h2>
        <p>
          We may add advertising in the future. If we do, third-party ad partners
          (such as Google AdSense) may set cookies to personalise ads. Users in
          the EEA, UK and California will be given the choice to opt in/out as
          required by GDPR / UK GDPR / CCPA.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access,
          correct, delete or object to processing of your personal data. Email{" "}
          <a className="text-[var(--color-accent)] hover:underline" href="/contact">our contact form</a> and we will respond within 30 days.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Children</h2>
        <p>
          The site is appropriate for general audiences but is not directed at
          children under 13. If you believe a child has provided personal
          information to us, please contact us and we will remove it.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The &quot;Last updated&quot; date
          at the top of this page reflects the most recent change.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p>
          Questions? Use the <a className="text-[var(--color-accent)] hover:underline" href="/contact">contact page</a>.
        </p>
      </div>
    </article>
  );
}
