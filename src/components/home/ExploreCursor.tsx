"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const follow = { stiffness: 280, damping: 24, mass: 0.35 };
const trail = { stiffness: 120, damping: 20, mass: 0.6 };

export function ExploreCursor({
  active,
  x,
  y,
}: {
  active: boolean;
  x: number;
  y: number;
}) {
  const rawX = useMotionValue(x);
  const rawY = useMotionValue(y);

  useEffect(() => {
    rawX.set(x);
    rawY.set(y);
  }, [rawX, rawY, x, y]);

  const buttonX = useSpring(rawX, follow);
  const buttonY = useSpring(rawY, follow);
  const trailX = useSpring(rawX, trail);
  const trailY = useSpring(rawY, trail);

  return (
    <>
      <motion.span
        id="ExploreTrail"
        data-ui="ExploreTrail"
        aria-hidden
        className="pointer-events-none absolute z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-pill/20 md:block"
        style={{ left: trailX, top: trailY }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.55 }}
        transition={{ duration: 0.18 }}
      />
      <motion.span
        id="ExploreCursorButton"
        data-ui="ExploreCursorButton"
        className="pointer-events-none absolute z-30 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-[20px] bg-pill px-4 py-2 text-label leading-none text-white md:flex"
        style={{ left: buttonX, top: buttonY }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.7 }}
        transition={{ duration: 0.18 }}
      >
        explore
      </motion.span>
    </>
  );
}
