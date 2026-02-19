"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

export default function Marquee() {
  const t = useTranslations("marquee");
  const items = t("items").split(",");

  const containerRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const first = firstRef.current;
    if (!container || !first) return;

    // Clone content twice for seamless loop
    container.appendChild(container.children[0].cloneNode(true));
    container.appendChild(container.children[0].cloneNode(true));

    let offset = 0;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const speed = isMobile ? 0.52 : 0.26;
    let rafId: number;

    const tick = () => {
      offset += speed;
      if (offset > first.clientWidth) {
        offset = 0;
      }
      first.style.marginLeft = `-${offset}px`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative py-8 overflow-hidden border-y border-border/50">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div ref={containerRef} className="flex whitespace-nowrap">
        <div ref={firstRef} className="flex shrink-0">
          {items.map((item, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="text-[48px] font-medium text-[#2c2c35] mx-2 sm:mx-4 lg:mx-5 font-display whitespace-nowrap">
                {item}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2c2c35] mx-1 shrink-0" aria-hidden="true">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
