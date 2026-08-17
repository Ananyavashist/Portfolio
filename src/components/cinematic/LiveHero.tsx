"use client";

import { useState } from "react";
import { cinematic, heroCards } from "@/content/cinematic";
import { HeroCardLayer } from "@/components/cinematic/HeroCardLayer";
import { asset } from "@/lib/asset";

// Positions are percentages of the navy canvas, measured off the full-bleed
// mockup (no blue frame). Sizes use cqw so type scales with the canvas as the
// shell expands during the reveal.
const META = "text-[clamp(9px,1.36cqw,20px)]";
const LABEL = "text-[clamp(12px,1.78cqw,26px)]";

// Nudges each block up so the glyph ink, not the line box, lands on the mark.
// Balsamiq Sans sits a little lower in its line box than Indie Flower did.
const inkTop = (percent: number) => `calc(${percent}% - 0.28em)`;

function HeroMeta() {
  return (
    <div
      id="HeroMeta"
      data-ui="HeroMeta"
      className={`pointer-events-none absolute inset-0 z-50 leading-[1.25] text-white ${META}`}
    >
      <p
        id="HeroMetaName"
        data-ui="HeroMetaName"
        className="absolute"
        style={{ left: "8.50%", top: inkTop(9.15) }}
      >
        {cinematic.hero.name}
        <br />
        {cinematic.hero.year}
      </p>
      <p
        id="HeroMetaRole"
        data-ui="HeroMetaRole"
        className="absolute"
        style={{ left: "32.32%", top: inkTop(9.15) }}
      >
        {cinematic.hero.role}
        <br />
        {cinematic.hero.location}
      </p>
      <p
        id="HeroMetaCraft"
        data-ui="HeroMetaCraft"
        className="absolute"
        style={{ left: "59.67%", top: inkTop(9.15) }}
      >
        {cinematic.hero.craft}
        <br />
        {cinematic.hero.craftNote}
      </p>
    </div>
  );
}

function HeroMenu() {
  return (
    <div
      id="HeroMenu"
      data-ui="HeroMenu"
      className={`pointer-events-none absolute z-50 flex items-center justify-center text-white ${LABEL}`}
      style={{
        left: "91.31%",
        top: "11.78%",
        width: "8.4%",
        aspectRatio: "258 / 172",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/intro/menu-circle.png")}
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-contain"
      />
      <span className="relative leading-none">{cinematic.hero.menu}</span>
    </div>
  );
}

export function LiveHero({ interactive }: { interactive: boolean }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="LiveHero"
      data-ui="LiveHero"
      className="h-full w-full bg-[var(--cinematic-navy)] font-hero"
    >
      <div
        id="HeroCanvas"
        data-ui="HeroCanvas"
        onClick={() => interactive && setActiveId(null)}
        className="relative h-full w-full overflow-hidden bg-[var(--cinematic-navy)]"
        style={{ containerType: "size" }}
      >
        <div
          id="HeroCollage"
          data-ui="HeroCollage"
          className="absolute left-1/2 top-[55.85%]"
          style={{
            // Soft 1232px floor and proportional 84.96cqw target, capped at
            // 1500px, then clamped by the horizontal (90cqw) and vertical
            // (64.9cqh of canvas, converted through the 2.2656 aspect) safe
            // areas so no card can touch an edge or the header zone.
            //
            // The absolute-px terms are multiplied by --k (1 outside the scroll
            // reveal) so the collage stays a true proportional miniature while
            // the shell is small, and lands on the px bounds at full size.
            width:
              "min(calc(1500px * var(--k, 1)), max(calc(1232px * var(--k, 1)), 84.96cqw), 90cqw, calc(64.9cqh * 2.2656))",
            aspectRatio: "2.2656",
            transform: "translate(-50%, -50%)",
            pointerEvents: interactive ? "auto" : "none",
          }}
        >
          {heroCards.map((card) => (
            <HeroCardLayer
              key={card.id}
              card={card}
              interactive={interactive}
              active={activeId === card.id}
              onActivate={setActiveId}
            />
          ))}
        </div>
        <HeroMeta />
        <HeroMenu />
      </div>
    </section>
  );
}
