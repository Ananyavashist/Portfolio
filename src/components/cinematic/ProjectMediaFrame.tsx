"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { asset } from "@/lib/asset";
import { cinematic } from "@/content/cinematic";
import styles from "./ProjectMediaFrame.module.css";

const slides = cinematic.hero.carousel;
const HOLD_MS = 4000;
const TRANSITION_S = 0.4;

export function ProjectMediaFrame() {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [size, setSize] = useState({ width: 324, height: 323 });
  const [index, setIndex] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);

  const loopSlides =
    !prefersReducedMotion && slides.length > 1
      ? [...slides, slides[0]]
      : slides;
  const cloneIndex = slides.length;

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const width = frame.offsetWidth;
      const height = frame.offsetHeight;
      setSize((current) =>
        Math.abs(current.width - width) < 0.5 &&
        Math.abs(current.height - height) < 0.5
          ? current
          : { width, height },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || slides.length < 2) return;
    if (index === cloneIndex) return;
    const timeout = window.setTimeout(() => {
      setIndex((current) => current + 1);
    }, HOLD_MS);
    return () => window.clearTimeout(timeout);
  }, [cloneIndex, index, prefersReducedMotion]);

  useLayoutEffect(() => {
    if (!skipTransition) return;
    const frame = requestAnimationFrame(() => setSkipTransition(false));
    return () => cancelAnimationFrame(frame);
  }, [skipTransition]);

  return (
    <div
      ref={frameRef}
      id="ProjectMediaFrame"
      data-ui="ProjectMediaFrame"
      data-active-index={index % slides.length}
      className={styles.frame}
      role="region"
      aria-label="Selected project work"
      aria-live="polite"
    >
      <motion.div
        id="ProjectImageTrack"
        data-ui="ProjectImageTrack"
        className={styles.track}
        animate={{ x: -index * size.width }}
        transition={
          prefersReducedMotion || skipTransition
            ? { duration: 0 }
            : { duration: TRANSITION_S, ease: [0.22, 1, 0.36, 1] }
        }
        style={{ willChange: prefersReducedMotion ? "auto" : "transform" }}
        onAnimationComplete={() => {
          if (index !== cloneIndex) return;
          setSkipTransition(true);
          setIndex(0);
        }}
      >
        {loopSlides.map((slide, slideIndex) => (
          <figure
            key={`${slide.id}-${slideIndex}`}
            className={styles.slide}
            style={{ width: size.width, height: size.height }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(slide.src)}
              alt={slideIndex === cloneIndex ? "" : slide.alt}
              width={648}
              height={646}
              decoding={slideIndex === 0 ? "sync" : "async"}
              loading={slideIndex === 0 ? "eager" : "lazy"}
              fetchPriority={slideIndex === 0 ? "high" : "low"}
            />
          </figure>
        ))}
      </motion.div>
    </div>
  );
}
