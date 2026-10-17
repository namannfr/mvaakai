import { ImageResponse } from "next/og";

export const alt = "Mvaak — Real-world demonstrations. Training-ready data.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const bars = [40, 56, 72, 56, 40];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#151a21",
          color: "#e8ecf4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ width: 12, height: h, borderRadius: 6, background: "#8fa8ff" }} />
          ))}
          <div style={{ marginLeft: 22, fontSize: 52, fontWeight: 700, color: "#ffffff", letterSpacing: -1 }}>mvaak</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#8fa8ff", textTransform: "uppercase" }}>
            Egocentric Data · Physical AI · Data Operations
          </div>
          <div style={{ marginTop: 24, fontSize: 76, fontWeight: 700, lineHeight: 1.04, color: "#ffffff", letterSpacing: -2 }}>
            Real-world demonstrations. Training-ready data.
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#9aa6bd" }}>mvaak.com · team@mvaak.com</div>
      </div>
    ),
    size,
  );
}
