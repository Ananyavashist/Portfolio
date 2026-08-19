"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { heroCards } from "@/content/cinematic";
import { asset } from "@/lib/asset";
import { IntroVideo } from "@/components/cinematic/IntroVideo";
import { AboutSection } from "@/components/cinematic/AboutSection";
import { LiveHero } from "@/components/cinematic/LiveHero";
import { ScrollStack } from "@/components/cinematic/ScrollStack";
import { ProjectSection } from "@/components/home/ProjectSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { SiteFooter } from "@/components/site/SiteFooter";

export function CinematicExperience() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [introCleared, setIntroCleared] = useState(false);

  useEffect(() => setMounted(true), []);

  // The static export cannot know a visitor's motion preference, and
  // useReducedMotion reads the media query during render. Deferring the branch
  // until after mount keeps the server and the first client render in agreement;
  // the swap lands behind the opaque intro overlay.
  const reducedMotion = mounted && prefersReducedMotion;

  const finishVideo = useCallback(() => setVideoEnded(true), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Every refresh replays the intro from the top with the original collage.
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // The reduced-motion path lands straight on the finished hero, so the page
    // background belongs to the hero from the start.
    if (reducedMotion) document.documentElement.dataset.stage = "hero";
  }, [reducedMotion]);

  useEffect(() => {
    const root = document.documentElement;
    // Scrolling is released the instant the video is over. Waiting for the
    // overlay's fade to finish would swallow the first gesture after it ends.
    if (!videoEnded) {
      root.classList.add("scroll-locked");
      return () => root.classList.remove("scroll-locked");
    }
    root.classList.remove("scroll-locked");
    // Nudge scroll-progress observers to re-measure now that the document scrolls again.
    const frame = window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [videoEnded]);

  useEffect(() => {
    const images = [
      ...heroCards.map(({ src }) => asset(src)),
      asset("/intro/hero-final-background.png"),
    ].map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });
    return () => {
      images.forEach((image) => {
        image.src = "";
      });
    };
  }, []);

  return (
    <main
      id="CinematicPage"
      data-ui="CinematicPage"
      className="bg-[var(--cinematic-black)] font-handwritten"
    >
      {reducedMotion ? (
        <>
          <div id="StaticHero" data-ui="StaticHero" className="h-[100svh] w-full">
            <LiveHero interactive={introCleared} />
          </div>
          <AboutSection />
          <ProjectSection />
          <TestimonialSection />
          <SiteFooter />
        </>
      ) : (
        <ScrollStack />
      )}

      {introCleared ? null : (
        <motion.div
          id="IntroOverlay"
          data-ui="IntroOverlay"
          className={`fixed inset-0 z-[100] bg-[#000000] ${
            videoEnded ? "pointer-events-none" : ""
          }`}
          initial={{ opacity: 1 }}
          animate={{ opacity: videoEnded ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (videoEnded) setIntroCleared(true);
          }}
        >
          <IntroVideo onFinish={finishVideo} />
        </motion.div>
      )}
    </main>
  );
}
