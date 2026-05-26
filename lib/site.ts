// Single source of truth for site identity. Used across metadata, sitemap,
// robots.txt, JSON-LD, OG images, manifest, etc.

export const SITE = {
  name: "gegegemu",
  domain: "gegegemu.com",
  url: "https://gegegemu.com",
  tagline: "Play free mini games online",
  description:
    "Free online mini games — puzzles, arcade, racing, shooter, strategy and more. No downloads, no sign-ups. Just press play.",
  shortDescription: "Free mini games. No download. Just press play.",
  keywords: [
    "free online games",
    "mini games",
    "browser games",
    "html5 games",
    "no download games",
    "play games online",
    "puzzle games",
    "arcade games",
    "racing games",
    "shooter games",
  ],
  author: "gegegemu",
  twitter: "", // add when you have one
  themeColor: "#ff6b35",
  backgroundColor: "#050818",
  ogImage: "/og/default.png",
  gaId: "G-J9TJJ71SXB",
} as const;

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
