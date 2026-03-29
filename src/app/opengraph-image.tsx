import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CareerTalks — Shape Your Tomorrow, Today";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 80,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.15)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.12)",
            filter: "blur(40px)",
          }}
        />

        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            CT
          </div>
          <span style={{ color: "white", fontSize: 32, fontWeight: 700 }}>
            CareerTalks
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>Shape Your Tomorrow,</span>
          <span style={{ color: "#a78bfa" }}>Today</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "#c7d2fe",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Free career guidance for students and young professionals.
          20 career paths, 11 interactive tools, 100% free.
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 24,
            color: "#a5b4fc",
            fontSize: 16,
          }}
        >
          <span>careertalks.space</span>
          <span>|</span>
          <span>No Signups Required</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
