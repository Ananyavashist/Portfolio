"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { AboutSection } from "@/components/cinematic/AboutSection";
import { HeroStage } from "@/components/cinematic/HeroStage";
import { StackCard } from "@/components/cinematic/StackCard";
import { ProjectSection } from "@/components/home/ProjectSection";

// Sticky-stack geometry. A `sticky top-0` card of CARD_SVH inside a track of
// height T stays pinned for (T - CARD_SVH) of scroll. Pulling every card after
// the first up by CARD_SVH makes its rise land exactly inside the previous
// card's pinned hold, so only one card ever moves at a time.
//
// With HERO_TRACK_SVH = H, the about card rises over [H-200, H-100] and the
// hero unpins at H-100 — the moment about finishes covering it.
const CARD_SVH = 100;
const HERO_TRACK_SVH = 350;
const HERO_REVEAL_SVH = 90;
const ABOUT_TRACK_SVH = 280;

const HERO_REVEAL_FRACTION = HERO_REVEAL_SVH / HERO_TRACK_SVH;
const CARD_RADIUS = "28px";

export function ScrollStack() {
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const aboutTrackRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const stageName = useRef("reveal");
  const [heroComplete, setHeroComplete] = useState(false);
  const [metricsActive, setMetricsActive] = useState(false);

  const { scrollYProgress: heroTrackProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  const heroReveal = useTransform(
    heroTrackProgress,
    [0, HERO_REVEAL_FRACTION],
    [0, 1],
    { clamp: true },
  );

  // 0 → 1 as the about card climbs from the viewport bottom to fully pinned.
  const { scrollYProgress: aboutRise } = useScroll({
    target: aboutTrackRef,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: projectsRise } = useScroll({
    target: projectsRef,
    offset: ["start end", "start start"],
  });

  useMotionValueEvent(heroReveal, "change", (value) => {
    setHeroComplete(value >= 0.995);
    const next = value > 0.9 ? "hero" : "reveal";
    if (next !== stageName.current) {
      stageName.current = next;
      document.documentElement.dataset.stage = next;
    }
  });

  useMotionValueEvent(aboutRise, "change", (value) => {
    setMetricsActive(value >= 0.5);
  });

  return (
    <div id="ScrollStack" data-ui="ScrollStack" className="relative">
      <div
        ref={heroTrackRef}
        id="HeroTrack"
        data-ui="HeroTrack"
        className="relative z-10"
        style={{ height: `${HERO_TRACK_SVH}svh` }}
      >
        <StackCard
          id="HeroCard"
          coverProgress={aboutRise}
          className="bg-[var(--cinematic-black)]"
        >
          <HeroStage revealProgress={heroReveal} interactive={heroComplete} />
        </StackCard>
      </div>

      <div
        ref={aboutTrackRef}
        id="AboutTrack"
        data-ui="AboutTrack"
        className="relative z-20"
        style={{
          height: `${ABOUT_TRACK_SVH}svh`,
          marginTop: `-${CARD_SVH}svh`,
        }}
      >
        <StackCard
          id="AboutCard"
          coverProgress={projectsRise}
          className="bg-white"
          radius={CARD_RADIUS}
        >
          <AboutSection
            metricsActive={metricsActive}
            overlayProgress={aboutRise}
          />
        </StackCard>
      </div>

      <div
        ref={projectsRef}
        id="ProjectsCard"
        data-ui="ProjectsCard"
        className="relative z-30 min-h-[100svh] overflow-hidden bg-white"
        style={{
          marginTop: `-${CARD_SVH}svh`,
          borderTopLeftRadius: CARD_RADIUS,
          borderTopRightRadius: CARD_RADIUS,
        }}
      >
        <ProjectSection />
      </div>
    </div>
  );
}
