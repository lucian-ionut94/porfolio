"use client";

import { ReactNode } from "react";

interface StarBorderProps {
  children: ReactNode;
  className?: string;
  color?: string;
  speed?: string;
}

export default function StarBorder({
  children,
  className = "",
  color = "#a3e635",
  speed = "6s",
}: StarBorderProps) {
  return (
    <div
      className={`relative inline-block overflow-hidden rounded-full ${className}`}
      style={
        {
          "--star-color": color,
          "--star-speed": speed,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{ clipPath: "inset(0 round 9999px)" }}
      >
        <div className="star-border-rotate absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0%,var(--star-color)_10%,transparent_20%)]" />
      </div>
      <div className="relative z-10 bg-background rounded-full">
        {children}
      </div>
    </div>
  );
}
