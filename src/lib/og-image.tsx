import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgConfig {
  subtitle: string;
  tags?: string[];
}

export function makeOgImage({ subtitle, tags }: OgConfig): ImageResponse {
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
            "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 60,
            height: 4,
            borderRadius: 2,
            background: "#a3e635",
            marginBottom: 32,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Lucian Ionuț
        </div>

        {/* Page subtitle */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: "#a3e635",
            marginBottom: 28,
          }}
        >
          {subtitle}
        </div>

        {/* Optional tags */}
        {tags && tags.length > 0 && (
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 18,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Domain */}
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.3)",
            position: "absolute",
            bottom: 60,
            left: 80,
          }}
        >
          lucianionut.com
        </div>

        {/* Decorative dot */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#a3e635",
            position: "absolute",
            bottom: 64,
            right: 80,
          }}
        />
      </div>
    ),
    { ...OG_SIZE }
  );
}
