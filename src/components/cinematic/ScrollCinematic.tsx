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
import { AboutSection } from "@/components/cinematic/AboutSection";
import { LiveHero } from "@/components/cinematic/LiveHero";

const HERO_REVEAL_END = 0.35;
const ABOUT_OVERLAY_START = 0.4;

// Approved resting shell fraction and fast reveal curve (heroRevealProgress 0 → 1).
const START_K = 0.078;
const SHELL_CURVE_AT = [0, 0.18, 0.42, 0.68, 0.86, 1];
const SHELL_CURVE_K = [0, 0.2, 0.5, 0.76, 0.93, 1];

export function ScrollCinematic() {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const stageName = useRef("reveal");
  const [heroComplete, setHeroComplete] = useState(false);
  const [aboutInteractive, setAboutInteractive] = useState(false);
  const [metricsActive, setMetricsActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });

  const heroRevealProgress = useTransform(
    scrollYProgress,
    [0, HERO_REVEAL_END],
    [0, 1],
    { clamp: true },
  );

  const aboutOverlayProgress = useTransform(
    scrollYProgress,
    [ABOUT_OVERLAY_START, 1],
    [0, 1],
    { clamp: true },
  );

  const shellCurve = useTransform(
    heroRevealProgress,
    SHELL_CURVE_AT,
    SHELL_CURVE_K,
  );
  const k = useTransform(shellCurve, [0, 1], [START_K, 1]);

  useMotionValueEvent(heroRevealProgress, "change", (value) => {
    setHeroComplete(value >= 0.995);
    const next = value > 0.9 ? "hero" : "reveal";
    if (next !== stageName.current) {
      stageName.current = next;
      document.documentElement.dataset.stage = next;
    }
  });

  useMotionValueEvent(aboutOverlayProgress, "change", (value) => {
    setAboutInteractive(value > 0.02);
    setMetricsActive(value >= 0.5);
  });

  const pillOpacity = useTransform(heroRevealProgress, [0, 0.05], [1, 0]);
  const pillY = useTransform(heroRevealProgress, [0, 0.09], [0, -160]);

  const gapT = useTransform(heroRevealProgress, [0, 0.3], [0, 1]);

  const radiusPx = useTransform(
    heroRevealProgress,
    [0.1, 0.65, 0.9, 1],
    [6, 16, 18, 0],
  );
  const shellRadius = useMotionTemplate`${radiusPx}px`;

  const sentenceOpacity = useTransform(
    heroRevealProgress,
    [0.68, 0.92],
    [1, 0],
  );

  const aboutY = useTransform(aboutOverlayProgress, [0, 1], ["100%", "0%"]);
  const aboutScale = useTransform(aboutOverlayProgress, [0, 1], [0.96, 1]);

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
    <section
      ref={sequenceRef}
      id="CinematicSequence"
      data-ui="CinematicSequence"
      className="relative h-[280svh] md:h-[300svh]"
    >
      <div
        id="ScrollCinematicStage"
        data-ui="ScrollCinematicStage"
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[var(--cinematic-black)]"
      >
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
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center whitespace-nowrap text-[36px] leading-none text-white"
            style={
              {
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
                transformOrigin: "center center",
              }}
            >
              <div className="absolute inset-0">
                <LiveHero interactive={heroComplete} />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.section
          id="AboutOverlay"
          data-ui="AboutOverlay"
          className={`absolute inset-0 z-50 h-full w-full origin-bottom ${aboutInteractive ? "pointer-events-auto" : "pointer-events-none"}`}
          style={{
            y: aboutY,
            scale: aboutScale,
            transformOrigin: "bottom center",
          }}
        >
          <AboutSection metricsActive={metricsActive} />
        </motion.section>
      </div>
    </section>
  );
}
