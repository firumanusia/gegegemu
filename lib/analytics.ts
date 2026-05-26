// Thin gtag wrapper. Safe to call in SSR (no-op when window/gtag absent).
// Tracks return type lets consumers chain without TS errors.

type GtagFn = (
  command: "event" | "config" | "set",
  action: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}
