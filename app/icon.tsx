import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: "white",
            fontWeight: 800,
            display: "flex",
          }}
        >
          g
        </div>
      </div>
    ),
    { ...size },
  );
}
