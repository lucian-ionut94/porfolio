"use client";

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function ShinyText({
  text,
  className = "",
  speed = 2.2,
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block font-sans font-medium ${className}`}
      style={{
        WebkitTextFillColor: "transparent",
        background:
          "currentColor linear-gradient(90deg, transparent 0%, #fff 50%, transparent 100%) -4rem 0 / 4rem 100% no-repeat",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        animation: `shimmer ${speed}s infinite`,
      }}
    >
      {text}
    </span>
  );
}
