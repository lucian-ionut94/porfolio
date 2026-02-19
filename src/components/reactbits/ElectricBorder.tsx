"use client";

import { useRef, useEffect, ReactNode } from "react";

interface ElectricBorderProps {
  children: ReactNode;
  className?: string;
  color?: string;
  speed?: number;
  thickness?: number;
}

export default function ElectricBorder({
  children,
  className = "",
  color = "#a3e635",
  speed = 2,
  thickness = 1.5,
}: ElectricBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    const draw = (time: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const perimeter = 2 * (width + height);
      const t = ((time / 1000) * speed) % 1;
      const segLen = perimeter * 0.2;
      const startPos = t * perimeter;

      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;

      const r = 12;

      ctx.beginPath();

      for (let s = 0; s < segLen; s += 2) {
        let pos = (startPos + s) % perimeter;
        let x: number, y: number;

        if (pos < width - r) {
          x = r + pos;
          y = 0;
        } else if (pos < width + height - 2 * r) {
          x = width;
          y = r + (pos - (width - r));
        } else if (pos < 2 * width + height - 3 * r) {
          x = width - r - (pos - (width + height - 2 * r));
          y = height;
        } else {
          x = 0;
          y = height - r - (pos - (2 * width + height - 3 * r));
        }

        const alpha = 1 - s / segLen;
        ctx.globalAlpha = alpha * 0.8;

        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animFrame = requestAnimationFrame(() => draw(performance.now()));
    };

    animFrame = requestAnimationFrame(() => draw(performance.now()));

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, [color, speed, thickness]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
      />
      {children}
    </div>
  );
}
