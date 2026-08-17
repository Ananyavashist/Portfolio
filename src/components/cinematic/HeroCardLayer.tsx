"use client";

import type { HeroCard } from "@/content/cinematic";
import { asset } from "@/lib/asset";

// Fixed cards, brought to the front on click. Normal order 10-21, selected 30,
// which stays below labels (40) and the header/menu (50).
const BASE_Z = 9;
const ACTIVE_Z = 30;

export function HeroCardLayer({
  card,
  interactive,
  active,
  onActivate,
}: {
  card: HeroCard;
  interactive: boolean;
  active: boolean;
  onActivate: (id: string) => void;
}) {
  return (
    <button
      type="button"
      id={card.id}
      data-ui="HeroCardLayer"
      aria-label={card.alt}
      tabIndex={interactive ? 0 : -1}
      onClick={(event) => {
        event.stopPropagation();
        onActivate(card.id);
      }}
      className="absolute block select-none p-0 transition-[z-index] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      style={{
        left: `${card.x}%`,
        top: `${card.y}%`,
        width: `${card.width}%`,
        aspectRatio: card.ratio,
        zIndex: active ? ACTIVE_Z : BASE_Z + card.z,
        cursor: interactive ? "pointer" : "default",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(card.src)}
        alt=""
        draggable={false}
        className="pointer-events-none h-full w-full drop-shadow-[0_14px_30px_rgba(0,0,0,0.35)]"
      />
    </button>
  );
}
