"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { HeroArtboard } from "@/components/cinematic/HeroArtboard";

const CANVAS = "#fafafa";
const STAGE_W = 1689;
const STAGE_H = 931;

export function LiveHero({ interactive }: { interactive: boolean }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const measure = () => {
      const next = Math.min(
        canvas.clientWidth / STAGE_W,
        canvas.clientHeight / STAGE_H,
      );
      setScale((current) =>
        Math.abs(current - next) < 0.0005 ? current : next,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="LiveHero"
      data-ui="LiveHero"
      className="h-full w-full overflow-hidden"
      style={{ background: CANVAS }}
    >
      <div
        ref={canvasRef}
        id="HeroCanvas"
        data-ui="HeroCanvas"
        data-hero-stage-scale={scale}
        className="relative grid h-full w-full place-items-center overflow-hidden"
        style={{ background: CANVAS }}
      >
        <div
          style={{
            width: STAGE_W * scale,
            height: STAGE_H * scale,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: STAGE_W,
              height: STAGE_H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <HeroArtboard interactive={interactive} />
          </div>
        </div>
      </div>
    </section>
  );
}
