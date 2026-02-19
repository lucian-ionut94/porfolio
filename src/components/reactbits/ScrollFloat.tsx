"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface ScrollFloatProps {
  children: ReactNode;
  className?: string;
  floatDistance?: number;
  duration?: number;
  ease?: string;
}

export default function ScrollFloat({
  children,
  className = "",
  floatDistance = 40,
  duration = 1,
  ease = "power3.out",
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { y: floatDistance, opacity: 0 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration,
            ease,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [floatDistance, duration, ease]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
