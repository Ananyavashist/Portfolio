"use client";

import { Eye } from "iconsax-reactjs";
import { motion, type MotionValue, useSpring } from "motion/react";

const spring = { stiffness: 320, damping: 30, mass: 0.35 };

export function ExploreCursor({
  active,
  x,
  y,
}: {
  active: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const pillX = useSpring(x, spring);
  const pillY = useSpring(y, spring);

  return (
    <motion.span
      id="ExploreCursorButton"
      data-ui="ExploreCursorButton"
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden items-center gap-2 whitespace-nowrap rounded-pill bg-black px-[17px] py-3 text-[13px] font-semibold tracking-[0.02em] text-white [@media(hover:hover)_and_(pointer:fine)]:inline-flex"
      style={{ left: pillX, top: pillY, translateX: "-50%", translateY: "-50%" }}
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      VIEW CASE STUDY
      <Eye size={18} color="currentColor" variant="Linear" />
    </motion.span>
  );
}
