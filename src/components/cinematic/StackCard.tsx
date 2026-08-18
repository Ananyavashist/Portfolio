"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

const COVERED_SCALE = 0.92;
const COVERED_DIM = 0.4;

/**
 * One pinned card in the scroll stack. `coverProgress` runs 0 → 1 while the
 * next card rises over this one, which is when it recedes and darkens.
 */
export function StackCard({
  id,
  coverProgress,
  className = "",
  radius,
  children,
}: {
  id?: string;
  coverProgress: MotionValue<number>;
  className?: string;
  radius?: string;
  children: React.ReactNode;
}) {
  const scale = useTransform(coverProgress, [0, 1], [1, COVERED_SCALE]);
  const dim = useTransform(coverProgress, [0, 1], [0, COVERED_DIM]);

  return (
    <div className="sticky top-0 h-[100svh] w-full">
      <motion.div
        id={id}
        data-ui={id}
        className={`relative h-full w-full overflow-hidden will-change-transform ${className}`}
        style={{
          scale,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
        }}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[60] bg-black"
          style={{ opacity: dim }}
        />
      </motion.div>
    </div>
  );
}
