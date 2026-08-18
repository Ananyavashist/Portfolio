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
//
// Track heights are sized so no stretch of scroll leaves everything static:
// the about rise starts at 90svh, exactly where the hero reveal ends.
//
// Every card must also stay pinned until the projects card has fully covered
// it at 290svh. A card that unpins earlier keeps scrolling behind the card in
// front of it, and once that card scales down it exposes a moving slice of its
// neighbour. The hero therefore needs a 390svh track (pinned for 390-100), and
// the about track is pulled up by 200svh to keep its rise starting at 90svh.
const CARD_SVH = 100;
const HERO_TRACK_SVH = 390;
const HERO_REVEAL_SVH = 90;
const ABOUT_TRACK_SVH = 200;
const ABOUT_TRACK_PULL_SVH = 200;

// The about card lands after 60% of its rise window; the rest is reading time.
// Projects stays 1:1 so the grid never stalls before it starts scrolling.
const ABOUT_ARRIVE_AT = 0.6;

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

  // Everything keyed to the about rise finishes when the card lands, not when
  // its scroll window ends.
  const aboutCover = useTransform(aboutRise, (p) =>
    Math.min(1, p / ABOUT_ARRIVE_AT),
  );

  useMotionValueEvent(heroReveal, "change", (value) => {
    setHeroComplete(value >= 0.995);
    const next = value > 0.9 ? "hero" : "reveal";
    if (next !== stageName.current) {
      stageName.current = next;
      document.documentElement.dataset.stage = next;
    }
  });

  useMotionValueEvent(aboutCover, "change", (value) => {
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
          coverProgress={aboutCover}
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
          marginTop: `-${ABOUT_TRACK_PULL_SVH}svh`,
        }}
      >
        <StackCard
          id="AboutCard"
          coverProgress={projectsRise}
          className="bg-white"
          radius={CARD_RADIUS}
          riseProgress={aboutRise}
          arriveAt={ABOUT_ARRIVE_AT}
        >
          <AboutSection
            metricsActive={metricsActive}
            overlayProgress={aboutCover}
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
