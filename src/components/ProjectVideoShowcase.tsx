"use client";

import { useRef, useEffect, useState } from "react";

interface ProjectVideoShowcaseProps {
  desktopSrc: string;
  mobileSrc: string;
  accentColor: string;
  title: string;
}

export default function ProjectVideoShowcase({
  desktopSrc,
  mobileSrc,
  accentColor,
  title,
}: ProjectVideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    desktopVideoRef.current?.play().catch(() => {});
    mobileVideoRef.current?.play().catch(() => {});
  }, [isVisible]);

  return (
    <div ref={containerRef} className="relative w-full py-8 md:py-12">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${accentColor}15 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Desktop browser frame */}
        <div className="relative z-10">
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-[#0a0a0a] rounded-md px-3 py-1.5 text-[11px] text-muted font-mono truncate text-center">
                  {title.toLowerCase().replace(/\s+/g, "-")}.com
                </div>
              </div>
            </div>
            {/* Video area */}
            <div className="bg-[#111]">
              {isVisible && (
                <video
                  ref={desktopVideoRef}
                  src={desktopSrc}
                  muted
                  loop
                  playsInline
                  className="w-full"
                  aria-label={`${title} desktop preview`}
                />
              )}
            </div>
          </div>
        </div>

        {/* Phone frame - overlapping bottom-right */}
        <div className="absolute -bottom-8 -right-4 md:right-8 z-20 w-[120px] sm:w-[140px] md:w-[160px] rotate-[3deg]">
          <div className="rounded-[24px] overflow-hidden border-[3px] border-white/15 bg-[#0a0a0a] shadow-2xl">
            {/* Phone notch */}
            <div className="relative bg-[#0a0a0a] pt-2 pb-1">
              <div className="mx-auto w-16 h-4 bg-[#1a1a1a] rounded-full" />
            </div>
            {/* Video area */}
            <div className="aspect-[9/19.5] bg-[#111]">
              {isVisible && (
                <video
                  ref={mobileVideoRef}
                  src={mobileSrc}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label={`${title} mobile preview`}
                />
              )}
            </div>
            {/* Home indicator */}
            <div className="bg-[#0a0a0a] py-2">
              <div className="mx-auto w-10 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
