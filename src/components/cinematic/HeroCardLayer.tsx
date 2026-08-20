"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion } from "motion/react";
import type { HeroCard } from "@/content/cinematic";
import { asset } from "@/lib/asset";

// Fixed cards, brought to the front on click. Normal order 10-21, selected 30,
// which stays below labels (40) and the header/menu (50).
const BASE_Z = 9;
const ACTIVE_Z = 30;

export function HeroCardLayer({
  card,
  interactive,
  draggable,
  constraintsRef,
  active,
  onActivate,
}: {
  card: HeroCard;
  interactive: boolean;
  draggable: boolean;
  constraintsRef: RefObject<HTMLDivElement | null>;
  active: boolean;
  onActivate: (id: string) => void;
}) {
  // Releasing a drag still fires a click on the card, which would otherwise
  // read as a tap and toggle it.
  const dragged = useRef(false);
  const [dragReady, setDragReady] = useState(false);

  useEffect(() => setDragReady(true), []);

  return (
    <motion.button
      type="button"
      id={card.id}
      data-ui="HeroCardLayer"
      aria-label={card.alt}
      tabIndex={interactive ? 0 : -1}
      initial={false}
      drag={dragReady && draggable}
      dragConstraints={constraintsRef}
      // Constrained to the canvas with no rubber band, so a card can never be
      // thrown past the edge, and it stays exactly where it is dropped.
      dragElastic={0}
      dragMomentum={false}
      onDragStart={() => {
        dragged.current = true;
        onActivate(card.id);
      }}
      onDragEnd={() => {
        // Cleared on a later task so the click that follows the release still
        // sees the flag, and so a release outside the card cannot strand it.
        window.setTimeout(() => {
          dragged.current = false;
        }, 0);
      }}
      onClick={(event) => {
        event.stopPropagation();
        if (dragged.current) return;
        onActivate(card.id);
      }}
      className="absolute block select-none p-0 transition-[z-index] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      style={{
        left: `${card.x}%`,
        top: `${card.y}%`,
        width: `${card.width}%`,
        aspectRatio: card.ratio,
        zIndex: active ? ACTIVE_Z : BASE_Z + card.z,
        cursor: interactive ? (draggable ? "grab" : "pointer") : "default",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(card.src)}
        alt=""
        draggable={false}
        className="pointer-events-none h-full w-full drop-shadow-[0_14px_30px_rgba(0,0,0,0.35)]"
      />
    </motion.button>
  );
}
