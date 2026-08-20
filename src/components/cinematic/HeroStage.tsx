"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cinematic } from "@/content/cinematic";
import { LiveHero } from "@/components/cinematic/LiveHero";

// Approved resting shell fraction and fast reveal curve (revealProgress 0 → 1).
const START_K = 0.078;
const SHELL_CURVE_AT = [0, 0.18, 0.42, 0.68, 0.86, 1];
const SHELL_CURVE_K = [0, 0.2, 0.5, 0.76, 0.93, 1];

export function HeroStage({
  revealProgress,
  interactive,
}: {
  revealProgress: MotionValue<number>;
  interactive: boolean;
}) {
  const shellRef = useRef<HTMLDivElement>(null);

  const shellCurve = useTransform(
    revealProgress,
    SHELL_CURVE_AT,
    SHELL_CURVE_K,
  );
  const k = useTransform(shellCurve, [0, 1], [START_K, 1]);
  const insetPercent = useTransform(k, (value) => (1 - value) * 50);

  const pillOpacity = useTransform(revealProgress, [0, 0.05], [1, 0]);
  const pillY = useTransform(revealProgress, [0, 0.09], [0, -160]);

  const gapT = useTransform(revealProgress, [0, 0.3], [0, 1]);

  const radiusPx = useTransform(
    revealProgress,
    [0.1, 0.65, 0.9, 1],
    [6, 16, 18, 0],
  );
  const shellClipPath = useMotionTemplate`inset(${insetPercent}% ${insetPercent}% ${insetPercent}% ${insetPercent}% round ${radiusPx}px)`;

  const sentenceOpacity = useTransform(revealProgress, [0.68, 0.92], [1, 0]);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMotionValueEvent(k, "change", () => {
      const node = shellRef.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const dx = r.left + r.width / 2 - window.innerWidth / 2;
      const dy = r.top + r.height / 2 - window.innerHeight / 2;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        console.warn(
          `[HeroShell] off-centre by dx=${dx.toFixed(1)}px dy=${dy.toFixed(1)}px`,
        );
      }
    });
  }

  return (
    <motion.div
      id="HeroLayer"
      data-ui="HeroLayer"
      className="absolute inset-0 z-10 overflow-x-clip overflow-y-hidden"
      style={
        {
          "--k": k,
          "--gapT": gapT,
        } as React.CSSProperties
      }
    >
      <motion.div
        id="ScrollIndicator"
        data-ui="ScrollIndicator"
        className="pointer-events-none absolute inset-x-0 top-[5svh] z-40 flex justify-center"
        style={{ opacity: pillOpacity, y: pillY }}
      >
        <span className="rounded-pill bg-[var(--cinematic-pill)] px-4 py-2 text-label text-white/70">
          {cinematic.pill}
        </span>
      </motion.div>

      <div
        id="CinematicText"
        data-ui="CinematicText"
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center whitespace-nowrap leading-none text-white"
        style={
          {
            fontSize: "clamp(1.125rem, 2.4vw + 0.7rem, var(--type-h1))",
            "--gap":
              "calc(0.14em + max(var(--gapT), min(var(--k) / 0.078, 1)) * clamp(24px, 2.5vw, 48px) + var(--k) * clamp(12px, 1.2vw, 32px))",
          } as React.CSSProperties
        }
      >
        <motion.span
          id="SentenceLeft"
          data-ui="SentenceLeft"
          className="absolute will-change-transform"
          style={{
            right: "calc(50% + 50% * var(--k) + var(--gap))",
            opacity: sentenceOpacity,
          }}
        >
          {cinematic.sentence.left}
        </motion.span>
        <motion.span
          id="SentenceRight"
          data-ui="SentenceRight"
          className="absolute will-change-transform"
          style={{
            left: "calc(50% + 50% * var(--k) + var(--gap))",
            opacity: sentenceOpacity,
          }}
        >
          {cinematic.sentence.right}
        </motion.span>
      </div>

      <motion.div
        ref={shellRef}
        id="HeroShell"
        data-ui="HeroShell"
        className="absolute inset-0 z-30 overflow-hidden"
        style={{
          clipPath: shellClipPath,
          willChange: "clip-path",
          contain: "paint",
        }}
      >
        <LiveHero interactive={interactive} />
      </motion.div>
    </motion.div>
  );
}
