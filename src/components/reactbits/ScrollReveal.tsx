"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  text: string;
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  wordClassName?: string;
  scrollStart?: string;
  scrollEnd?: string;
  activeColor?: string;
  inactiveColor?: string;
}

export default function ScrollReveal({
  text,
  className = "",
  wordClassName = "",
  tag: Tag = "p",
  scrollStart = "top 80%",
  scrollEnd = "top 30%",
  activeColor,
  inactiveColor,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const els = wordsRef.current.filter(Boolean);
    if (els.length === 0 || !containerRef.current) return;

    if (activeColor && inactiveColor) {
      gsap.set(els, { color: inactiveColor });
    } else {
      gsap.set(els, { opacity: 0.15, filter: "blur(4px)" });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: scrollStart,
        end: scrollEnd,
        scrub: true,
      },
    });

    els.forEach((el, i) => {
      tl.to(
        el,
        activeColor && inactiveColor
          ? { color: activeColor, duration: 0.5 }
          : { opacity: 1, filter: "blur(0px)", duration: 0.5 },
        i * 0.05
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [text, scrollStart, scrollEnd, activeColor, inactiveColor]);

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          ref={(el) => {
            if (el) wordsRef.current[i] = el;
          }}
          className={`inline-block mr-[0.3em] ${wordClassName}`}
          style={activeColor && inactiveColor ? { color: inactiveColor } : { opacity: 0.15 }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
