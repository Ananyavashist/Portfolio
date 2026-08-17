"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { cinematic } from "@/content/cinematic";
import { LiveHero } from "@/components/cinematic/LiveHero";

// Shell size as a fraction of the stage. The middle stops are the widths
// measured off storyboard frames 6, 7 and 8; k reaches exactly 1 at the end so
// the shell equals the stage and the navy canvas meets all four viewport edges.
const SHELL_AT = [0.1, 0.25, 0.45, 0.65, 0.9, 1];
const SHELL_K = [0, 0.078, 0.139, 0.315, 0.8, 1];

export function ScrollCinematic() {
  const trackRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const stageName = useRef("reveal");
  const [heroComplete, setHeroComplete] = useState(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setHeroComplete(value > 0.995);
    const next = value > 0.9 ? "hero" : "reveal";
    if (next !== stageName.current) {
      stageName.current = next;
      document.documentElement.dataset.stage = next;
    }
  });

  const pillOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const pillY = useTransform(scrollYProgress, [0, 0.09], [0, -160]);

  // One value drives the whole transformation. Everything else is CSS calc off
  // --k, so the shell is centred structurally by the grid anchor and never
  // shifts off-centre.
  const k = useTransform(scrollYProgress, SHELL_AT, SHELL_K);

  // Text separation: 0 keeps a single word space between the halves; 1 opens
  // the full responsive gap once the reveal is under way.
  const gapT = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  const radiusPx = useTransform(
    scrollYProgress,
    [0.1, 0.65, 0.9, 1],
    [6, 16, 18, 0],
  );
  const shellRadius = useMotionTemplate`${radiusPx}px`;

  const sentenceOpacity = useTransform(scrollYProgress, [0.62, 0.8], [1, 0]);

  // Dev-only: warn if the shell centre ever drifts from the viewport centre.
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
    <div
      ref={trackRef}
      id="ScrollCinematicTrack"
      data-ui="ScrollCinematicTrack"
      className="relative h-[320svh] md:h-[450svh]"
    >
      <motion.div
        id="ScrollCinematicStage"
        data-ui="ScrollCinematicStage"
        className="sticky top-0 h-[100svh] w-full overflow-x-clip overflow-y-hidden bg-[var(--cinematic-black)]"
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
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center whitespace-nowrap text-[clamp(1.5rem,3.5vw,3rem)] leading-none text-white"
          style={
            {
              // Half of the space that separates each text half from the shell:
              // a word space at rest, opening to clamp(24px,2.5vw,48px).
              "--gap":
                "calc(0.14em + var(--gapT) * clamp(24px, 2.5vw, 48px))",
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

        <div
          id="CinematicCenterAnchor"
          data-ui="CinematicCenterAnchor"
          className="absolute inset-0 z-30 grid place-items-center"
        >
          <motion.div
            ref={shellRef}
            id="HeroShell"
            data-ui="HeroShell"
            className="relative overflow-hidden"
            style={{
              width: "calc(100% * var(--k))",
              height: "calc(100% * var(--k))",
              borderRadius: shellRadius,
            }}
          >
            <div className="absolute inset-0">
              <LiveHero interactive={heroComplete} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
