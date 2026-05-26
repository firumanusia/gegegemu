import { ImageResponse } from "next/og";
import { getAllGames, getGameBySlug, getCategoryBySlug } from "@/lib/games";

export const runtime = "nodejs";
export const contentType = "image/png";
export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllGames().map((g) => ({ slug: g.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return new Response("Not found", { status: 404 });

  const catNames = game.categories
    .map((c) => getCategoryBySlug(c)?.name ?? c)
    .join(" · ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "60px",
          background:
            "radial-gradient(ellipse 80% 60% at 15% -10%, rgba(255,107,53,0.35), transparent 60%), radial-gradient(ellipse 70% 50% at 90% 110%, rgba(255,182,39,0.25), transparent 60%), linear-gradient(180deg, #050818 0%, #0a0f24 100%)",
          color: "#f1f5f9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 28,
              fontWeight: 700,
              color: "#93a0c6",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, #ff6b35, #ffb627)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 28,
              }}
            >
              g
            </div>
            <div style={{ display: "flex" }}>
              <span style={{ color: "#f1f5f9" }}>gege</span>
              <span
                style={{
                  background: "linear-gradient(135deg, #ff6b35, #ffb627)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                gemu
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                color: "#ffb627",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {catNames || "Play free"}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 96,
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                maxWidth: 720,
              }}
            >
              {game.title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#cbd5e1",
                maxWidth: 720,
                lineHeight: 1.35,
              }}
            >
              {game.description.length > 140
                ? game.description.slice(0, 137) + "…"
                : game.description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              color: "#93a0c6",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #ff6b35, #ffb627)",
                color: "white",
                padding: "8px 18px",
                borderRadius: 999,
                fontWeight: 700,
                display: "flex",
              }}
            >
              ▶ Play free
            </span>
            <span>No download · No sign-up</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
