"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "@/i18n/navigation";

export default function ProgressBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);
  const prevPathname = useRef(pathname);
  const cleanupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    setComplete(true);
    cleanupTimer.current = setTimeout(() => {
      setVisible(false);
      setStarted(false);
      setComplete(false);
    }, 450);
  }, []);

  const begin = useCallback(() => {
    if (cleanupTimer.current) clearTimeout(cleanupTimer.current);
    if (safetyTimer.current) clearTimeout(safetyTimer.current);

    setVisible(true);
    setStarted(false);
    setComplete(false);

    // Two RAFs ensure the browser flushes the 0%-width paint
    // before we trigger the transition to 80%
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setStarted(true));
    });

    // Safety valve: auto-finish if navigation never completes
    safetyTimer.current = setTimeout(finish, 8000);
  }, [finish]);

  // Intercept all internal link clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) return;

      begin();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [begin]);

  // Complete when pathname changes
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      finish();
    }
  }, [pathname, finish]);

  // Width: 0% → 80% (loading) → 100% (done)
  const width =
    !visible || !started ? "0%" : complete ? "100%" : "80%";

  const widthTransition = complete
    ? "width 0.18s ease-in"
    : "width 0.45s cubic-bezier(0.05, 0.9, 0.3, 1)";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 9999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.35s",
      }}
    >
      <div
        style={{
          height: "100%",
          width,
          background: "var(--color-primary)",
          boxShadow: "0 0 10px 2px color-mix(in srgb, var(--color-primary) 60%, transparent)",
          transition: widthTransition,
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
}
