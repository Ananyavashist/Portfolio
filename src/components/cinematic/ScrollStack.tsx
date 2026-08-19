"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { AboutSection } from "@/components/cinematic/AboutSection";
import { HeroStage } from "@/components/cinematic/HeroStage";
import {
  COVERED_DIM,
  COVERED_SCALE,
  StackCard,
} from "@/components/cinematic/StackCard";
import { ProjectSection } from "@/components/home/ProjectSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { SiteFooter } from "@/components/site/SiteFooter";

// Sticky-stack geometry. A `sticky top-0` card of CARD_SVH inside a track of
// height T stays pinned for (T - CARD_SVH) of scroll. Pulling every card after
// the first up by CARD_SVH makes its rise land exactly inside the previous
// card's pinned hold, so only one card ever moves at a time.
//
// Every card must also stay pinned until the projects card has fully covered
// it. A card that unpins earlier keeps scrolling behind the card in front of
// it, and once that card scales down it exposes a moving slice of its
// neighbour. The hero therefore needs a track long enough to stay pinned all
// the way to 290svh, where projects lands.
//
// The whole sequence has to be gapless: something visible must move at every
// scroll position, so each stage starts exactly where the previous one ends.
//
//   0    → 90svh   hero collage reveals
//   90   → 190svh  about rises, hero recedes behind it
//   190  → 290svh  projects rises, about recedes behind it
//   290svh onward  the projects grid scrolls normally
//   grid end       projects pins on its last screen (see the tail below)
//   + 100svh       testimonials rise, projects recedes behind them
//   + 100svh       footer rises, testimonials recede behind it
const CARD_SVH = 100;
const HERO_TRACK_SVH = 390;
const HERO_REVEAL_SVH = 90;
const ABOUT_TRACK_SVH = 200;
const TESTIMONIALS_TRACK_SVH = 200;

// `offset: ["start start", "end end"]` spreads 0 → 1 across the distance the
// track scrolls past a pinned card, which is the track height minus one card —
// not the full track height.
const HERO_SCROLL_SVH = HERO_TRACK_SVH - CARD_SVH;
const HERO_REVEAL_FRACTION = HERO_REVEAL_SVH / HERO_SCROLL_SVH;

// The about card starts rising one viewport before its track's top, so this
// pull is what opens its rise exactly where the hero reveal closes.
const ABOUT_TRACK_PULL_SVH = HERO_SCROLL_SVH - HERO_REVEAL_SVH;

const CARD_RADIUS = "28px";

export function ScrollStack() {
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const aboutTrackRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectsPinRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const stageName = useRef("reveal");
  const [heroComplete, setHeroComplete] = useState(false);
  const [metricsActive, setMetricsActive] = useState(false);
  const [projectsPinTop, setProjectsPinTop] = useState(0);

  // Pins the projects card by its bottom edge. `sticky top-0` would freeze it
  // on its first screen and strand the rest of the grid, and `sticky bottom-0`
  // does nothing here: a bottom-anchored sticky box is only ever pulled up into
  // view, never held back once its natural position has scrolled past. A
  // negative top of (viewport - card height) parks the bottom edge on the
  // viewport bottom instead, which needs the card measured.
  useEffect(() => {
    const card = projectsPinRef.current;
    if (!card) return;
    const update = () => setProjectsPinTop(window.innerHeight - card.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(card);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

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

  const { scrollYProgress: testimonialsRise } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: footerRise } = useScroll({
    target: footerRef,
    offset: ["start end", "start start"],
  });

  // The projects card is too tall to pin from the top, so it cannot use
  // StackCard. It recedes by hand instead, with the origin pinned to the middle
  // of its last screen — scaling a multi-screen box from its own centre would
  // drag the visible content by a large fraction of the viewport.
  const projectsScale = useTransform(
    testimonialsRise,
    [0, 1],
    [1, COVERED_SCALE],
  );
  const projectsDim = useTransform(testimonialsRise, [0, 1], [0, COVERED_DIM]);

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
          marginTop: `-${ABOUT_TRACK_PULL_SVH}svh`,
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

      {/* The grid scrolls normally and then freezes on its last screen, which
          is the only way a card taller than the viewport can hold still for the
          card rising over it. A sticky box may only travel inside its parent's
          content box, so the screen of room it stays frozen against has to be a
          spacer sibling — padding on the track sits outside the content box and
          buys nothing. */}
      <div
        ref={projectsRef}
        id="ProjectsTrack"
        data-ui="ProjectsTrack"
        className="relative z-30"
        style={{ marginTop: `-${CARD_SVH}svh` }}
      >
        <div ref={projectsPinRef} className="sticky" style={{ top: projectsPinTop }}>
          <motion.div
            id="ProjectsCard"
            data-ui="ProjectsCard"
            className="relative min-h-[100svh] overflow-hidden bg-white will-change-transform"
            style={{
              scale: projectsScale,
              transformOrigin: `50% calc(100% - ${CARD_SVH / 2}svh)`,
              borderTopLeftRadius: CARD_RADIUS,
              borderTopRightRadius: CARD_RADIUS,
            }}
          >
            <ProjectSection />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[60] bg-black"
              style={{ opacity: projectsDim }}
            />
          </motion.div>
        </div>
        <div aria-hidden style={{ height: `${CARD_SVH}svh` }} />
      </div>

      <div
        ref={testimonialsRef}
        id="TestimonialsTrack"
        data-ui="TestimonialsTrack"
        className="relative z-40"
        style={{
          height: `${TESTIMONIALS_TRACK_SVH}svh`,
          marginTop: `-${CARD_SVH}svh`,
        }}
      >
        <StackCard
          id="TestimonialsCard"
          coverProgress={footerRise}
          className="bg-[#f7f7f7]"
          radius={CARD_RADIUS}
        >
          <TestimonialSection />
        </StackCard>
      </div>

      <div
        ref={footerRef}
        id="FooterCard"
        data-ui="FooterCard"
        className="relative z-50 overflow-hidden bg-black"
        style={{
          marginTop: `-${CARD_SVH}svh`,
          borderTopLeftRadius: CARD_RADIUS,
          borderTopRightRadius: CARD_RADIUS,
        }}
      >
        <SiteFooter />
      </div>
    </div>
  );
}
