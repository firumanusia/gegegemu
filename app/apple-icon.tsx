import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ff6b35, #ffb627)",
        }}
      >
        <div
          style={{
            fontSize: 110,
            color: "white",
            fontWeight: 800,
            display: "flex",
          }}
        >
          ✦
        </div>
      </div>
    ),
    { ...size },
  );
}
