"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  { r: 146, g: 222, b: 89 },
  { r: 143, g: 91, b: 171 },
  { r: 187, g: 185, b: 240 },
];

export function HeroFluid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let running = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const t = reduced ? 0 : time / 28000;
      const blobs = [
        {
          x: width * (0.22 + Math.sin(t * 0.7) * 0.12),
          y: height * (0.38 + Math.cos(t * 0.55) * 0.14),
          r: Math.max(width, height) * 0.42,
          c: COLORS[0],
        },
        {
          x: width * (0.68 + Math.cos(t * 0.5 + 1.2) * 0.14),
          y: height * (0.32 + Math.sin(t * 0.62 + 0.4) * 0.16),
          r: Math.max(width, height) * 0.5,
          c: COLORS[1],
        },
        {
          x: width * (0.48 + Math.sin(t * 0.4 + 2.1) * 0.16),
          y: height * (0.62 + Math.cos(t * 0.48 + 1.7) * 0.12),
          r: Math.max(width, height) * 0.46,
          c: COLORS[2],
        },
      ];

      ctx.globalCompositeOperation = "lighter";
      for (const blob of blobs) {
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        gradient.addColorStop(0, `rgba(${blob.c.r}, ${blob.c.g}, ${blob.c.b}, 0.55)`);
        gradient.addColorStop(0.45, `rgba(${blob.c.r}, ${blob.c.g}, ${blob.c.b}, 0.22)`);
        gradient.addColorStop(1, `rgba(${blob.c.r}, ${blob.c.g}, ${blob.c.b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    resize();
    draw(0);

    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };
    window.addEventListener("resize", onResize);

    const loop = (now: number) => {
      if (!running) return;
      draw(now);
      frame = window.requestAnimationFrame(loop);
    };

    if (!reduced) {
      frame = window.requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      id="HeroFluid"
      data-ui="HeroFluid"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white" />
    </div>
  );
}
