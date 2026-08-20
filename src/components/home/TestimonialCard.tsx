"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Testimonial } from "@/content/testimonials";

// Cards overlap left to right, so a later card sits above its neighbour. The
// raised one jumps above all of them.
const BASE_Z = 10;
const ACTIVE_Z = 30;

export function TestimonialCard({
  testimonial,
  index,
  fanned,
  overlap,
  active,
  onHover,
  onFocus,
}: {
  testimonial: Testimonial;
  index: number;
  fanned: boolean;
  overlap: number;
  active: boolean;
  onHover: (id: string | null) => void;
  onFocus: (id: string | null) => void;
}) {
  const reducedMotion = useReducedMotion();
  const tilt = fanned ? testimonial.rotate : 0;

  return (
    // The slot holds the layout while the card inside it moves, and hover is
    // tracked out here. Were it on the card, straightening would slide the hit
    // area out from under the pointer near the corners and the raise would
    // stutter on and off.
    <div
      data-ui="TestimonialSlot"
      className="relative flex min-w-0 md:flex-1 md:basis-0"
      style={{
        zIndex: active ? ACTIVE_Z : BASE_Z + index,
        marginLeft: fanned && index > 0 ? -overlap : 0,
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onHover(testimonial.id);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") onHover(null);
      }}
    >
      <motion.figure
        id={testimonial.id}
        data-ui="TestimonialCard"
        className="relative m-0 flex w-full flex-col rounded-media p-[clamp(1rem,2.2vw,1.75rem)] shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
        style={{ backgroundColor: testimonial.color }}
        animate={{
          rotate: active ? 0 : tilt,
          scale: active ? 1.03 : 1,
          y: active ? -10 : 0,
        }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 260, damping: 26 }
        }
      >
        <span
          aria-hidden
          className="block font-project text-h1 font-bold leading-none text-black/30"
        >
          &ldquo;
        </span>

        <blockquote className="mt-2 text-body font-medium leading-[1.5] text-black">
          {testimonial.quote}
        </blockquote>

        {/* Pushed to the bottom edge so all four name blocks line up even
            though the quotes differ in length. */}
        <figcaption className="mt-auto pt-[clamp(1rem,3vw,2rem)]">
          <span className="block text-label font-semibold leading-[1.3] text-black">
            {testimonial.name}
          </span>
          <span className="mt-1 block text-label leading-[1.3] text-black/70">
            {testimonial.role}
          </span>
        </figcaption>

        {/* Keyboard users get the same reveal on focus, since they never
            trigger the hover above. */}
        <button
          type="button"
          aria-label={`Bring the note from ${testimonial.name} to the front`}
          onFocus={() => onFocus(testimonial.id)}
          onBlur={() => onFocus(null)}
          className="absolute inset-0 rounded-media focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        />
      </motion.figure>
    </div>
  );
}
