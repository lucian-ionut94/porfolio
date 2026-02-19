"use client";

import { ReactNode } from "react";

interface LogoLoopProps {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export default function LogoLoop({
  children,
  speed = 30,
  pauseOnHover = true,
  className = "",
}: LogoLoopProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
        onMouseEnter={(e) => {
          if (pauseOnHover)
            (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          if (pauseOnHover)
            (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
