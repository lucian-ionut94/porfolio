"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  characters?: string;
  revealDirection?: "start" | "end" | "center";
  parentClassName?: string;
  encryptedClassName?: string;
  animateOnView?: boolean;
}

export default function DecryptedText({
  text,
  className = "",
  speed = 50,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*",
  revealDirection = "start",
  parentClassName = "",
  encryptedClassName = "text-muted",
  animateOnView = true,
}: DecryptedTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const decrypt = useCallback(() => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    let revealedCount = 0;
    const totalChars = text.length;

    const interval = setInterval(() => {
      revealedCount++;
      if (revealedCount > totalChars) {
        clearInterval(interval);
        setDisplayed(text);
        setIsDecrypting(false);
        return;
      }

      const result = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";

          let isRevealed = false;
          if (revealDirection === "start") isRevealed = i < revealedCount;
          else if (revealDirection === "end") isRevealed = i >= totalChars - revealedCount;
          else {
            const center = Math.floor(totalChars / 2);
            isRevealed = Math.abs(i - center) < revealedCount / 2;
          }

          if (isRevealed) return char;
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");

      setDisplayed(result);
    }, speed);
  }, [text, speed, characters, revealDirection, isDecrypting]);

  useEffect(() => {
    if (!animateOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          decrypt();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animateOnView, decrypt]);

  return (
    <span ref={containerRef} className={parentClassName}>
      {displayed.split("").map((char, i) => {
        const isRevealed = char === text[i];
        return (
          <span
            key={i}
            className={isRevealed ? className : `${className} ${encryptedClassName}`}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
