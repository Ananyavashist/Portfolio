"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { heroCards } from "@/content/cinematic";
import { asset } from "@/lib/asset";
import { IntroVideo } from "@/components/cinematic/IntroVideo";
import { LiveHero } from "@/components/cinematic/LiveHero";
import { ScrollCinematic } from "@/components/cinematic/ScrollCinematic";

export function CinematicExperience() {
  const reducedMotion = useReducedMotion();
  const [videoEnded, setVideoEnded] = useState(false);
  const [introCleared, setIntroCleared] = useState(false);

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
    if (introCleared) {
      root.classList.remove("scroll-locked");
      // Nudge scroll-progress observers to re-measure now that the document scrolls again.
      window.dispatchEvent(new Event("resize"));
      return;
    }
    root.classList.add("scroll-locked");
    return () => root.classList.remove("scroll-locked");
  }, [introCleared]);

  useEffect(() => {
    const images = heroCards.map(({ src }) => {
      const image = new Image();
      image.src = asset(src);
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
        <div id="StaticHero" data-ui="StaticHero" className="h-[100svh] w-full">
          <LiveHero interactive={introCleared} />
        </div>
      ) : (
        <ScrollCinematic />
      )}

      {introCleared ? null : (
        <motion.div
          id="IntroOverlay"
          data-ui="IntroOverlay"
          className="fixed inset-0 z-[100]"
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
