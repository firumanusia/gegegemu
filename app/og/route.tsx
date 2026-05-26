import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const contentType = "image/png";

// Default Open Graph image for the homepage and any page that doesn't override.
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse 80% 60% at 15% -10%, rgba(255,107,53,0.35), transparent 60%), radial-gradient(ellipse 70% 50% at 90% 110%, rgba(255,182,39,0.25), transparent 60%), linear-gradient(180deg, #050818 0%, #0a0f24 100%)",
          color: "#f1f5f9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "linear-gradient(135deg, #ff6b35, #ffb627)",
              boxShadow: "0 12px 32px rgba(255,107,53,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 56,
              color: "white",
            }}
          >
            g
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
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

        <div
          style={{
            marginTop: 60,
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 980,
            display: "flex",
          }}
        >
          {SITE.tagline}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            color: "#93a0c6",
            maxWidth: 900,
            display: "flex",
          }}
        >
          {SITE.shortDescription}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
