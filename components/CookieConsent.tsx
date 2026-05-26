"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const KEY = "gegegemu_consent_v1";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        // small delay to avoid layout-shift impacting LCP
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      /* localStorage may be unavailable (incognito SSR) */
    }
  }, []);

  function close(value: "accepted" | "dismissed") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* noop */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed bottom-3 left-3 right-3 z-40 mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-4 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:p-5"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#ffb627]">
        <Cookie className="h-5 w-5 text-white" />
      </span>
      <p className="flex-1 text-[13px] leading-relaxed text-[var(--color-muted)]">
        We use anonymous analytics cookies to understand how the site is used.
        No personal info, no ads (yet). See our{" "}
        <a className="text-[var(--color-accent)] hover:underline" href="/privacy">
          privacy policy
        </a>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => close("dismissed")}
          className="rounded-full border border-[var(--color-border)] bg-transparent px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-white/30 hover:text-white"
        >
          Dismiss
        </button>
        <button
          type="button"
          onClick={() => close("accepted")}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ffb627] px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-orange-500/30 transition-transform hover:scale-105"
        >
          OK, got it
        </button>
        <button
          type="button"
          aria-label="Close notice"
          onClick={() => close("dismissed")}
          className="ml-1 self-center rounded-full p-1 text-[var(--color-muted)] hover:text-white sm:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
