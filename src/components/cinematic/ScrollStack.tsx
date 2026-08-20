"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { HeroStage } from "@/components/cinematic/HeroStage";
import { ProjectSection } from "@/components/home/ProjectSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { setDockVisible } from "@/content/dockNavigation";

// Hero stays pinned only for the clip-path reveal. After that, the rest of
// the page is normal document flow — no stacked cards, no cover/scale.
const CARD_SVH = 100;
const HERO_REVEAL_SVH = 90;
const HERO_TRACK_SVH = HERO_REVEAL_SVH + CARD_SVH;

export function ScrollStack() {
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const stageName = useRef("reveal");
  const [heroComplete, setHeroComplete] = useState(false);

  const { scrollYProgress: heroTrackProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  const heroReveal = useTransform(heroTrackProgress, [0, 1], [0, 1], {
    clamp: true,
  });

  useMotionValueEvent(heroReveal, "change", (value) => {
    const complete = value >= 0.995;
    setHeroComplete(complete);
    setDockVisible(complete);
    const next = value > 0.9 ? "hero" : "reveal";
    if (next !== stageName.current) {
      stageName.current = next;
      document.documentElement.dataset.stage = next;
    }
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
        <div className="sticky top-0 h-[100svh] w-full">
          <div
            id="HeroCard"
            data-ui="HeroCard"
            className="relative h-full w-full overflow-hidden bg-[var(--cinematic-black)]"
          >
            <HeroStage revealProgress={heroReveal} interactive={heroComplete} />
          </div>
        </div>
      </div>

      <div id="ProjectsCard" data-ui="ProjectsCard">
        <ProjectSection />
      </div>

      <TestimonialSection />

      <div id="FooterCard" data-ui="FooterCard">
        <SiteFooter />
      </div>
    </div>
  );
}
