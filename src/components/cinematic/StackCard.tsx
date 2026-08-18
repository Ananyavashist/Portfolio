"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";

const COVERED_SCALE = 0.92;
const COVERED_DIM = 0.4;

/**
 * One pinned card in the scroll stack. `coverProgress` runs 0 → 1 while the
 * next card rises over this one, which is when it recedes and darkens.
 *
 * `riseProgress` is this card's own 0 → 1 climb from the viewport bottom, and
 * `arriveAt` front-loads that climb so the card lands after only that fraction
 * of the scroll window. The offset returns to exactly 0 at the end of the
 * window, so the handoff back to layout is seamless.
 */
export function StackCard({
  id,
  coverProgress,
  className = "",
  radius,
  riseProgress,
  arriveAt = 1,
  children,
}: {
  id?: string;
  coverProgress: MotionValue<number>;
  className?: string;
  radius?: string;
  riseProgress?: MotionValue<number>;
  arriveAt?: number;
  children: React.ReactNode;
}) {
  const scale = useTransform(coverProgress, [0, 1], [1, COVERED_SCALE]);
  const dim = useTransform(coverProgress, [0, 1], [0, COVERED_DIM]);

  const settled = useMotionValue(1);
  const rise = riseProgress ?? settled;

  // Percentages read as screen-heights here because the card is 100svh tall.
  const y = useTransform(rise, (p) => {
    if (arriveAt >= 1) return "0%";
    const natural = (1 - p) * 100;
    const target = Math.max(0, 1 - p / arriveAt) * 100;
    return `${target - natural}%`;
  });

  return (
    <div className="sticky top-0 h-[100svh] w-full">
      <motion.div
        id={id}
        data-ui={id}
        className={`relative h-full w-full overflow-hidden will-change-transform ${className}`}
        style={{
          y,
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
