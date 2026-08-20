"use client";

import { useEffect, useState } from "react";
import { recommendationsUrl, testimonials } from "@/content/testimonials";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { GridBackdrop } from "@/components/core/GridBackdrop";

// How far each card slides under its left neighbour in the fanned layout.
const OVERLAP_PX = 34;

export function TestimonialSection() {
  const [fanned, setFanned] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  // Both are transient, so a card only stays raised while the pointer is on it
  // or it holds focus. The pointer wins when a click leaves focus behind on a
  // card the pointer has since left.
  const activeId = hoveredId ?? focusedId;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setFanned(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="TestimonialSection"
      data-ui="TestimonialSection"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-x-clip bg-[#f7f7f7] font-project text-black"
    >
      <GridBackdrop />
      <div className="relative mx-auto w-full max-w-[1650px] px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(1.5rem,4vh,2.5rem)]">
        <header className="flex flex-col gap-8 [container-type:inline-size]">
          <h2 className="whitespace-nowrap font-handwritten font-semibold leading-[1.1] tracking-[-0.045em] text-black [font-size:min(var(--type-section-display),calc(100cqi/18))] [font-weight:600]">
            What it’s like to build with me
          </h2>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
            <p className="max-w-[620px] text-body leading-[1.5] text-black">
              A few words from teammates, mentors, and collaborators who’ve seen
              how I think, navigate ambiguity, and bring ideas to life
            </p>

          <a
            id="MoreWordsLink"
            data-ui="MoreWordsLink"
            href={recommendationsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[42px] shrink-0 items-center justify-center self-start rounded-pill bg-[#2F368F] px-[22px] text-body font-medium leading-none text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 md:self-auto"
          >
            More words
          </a>
          </div>
        </header>

        <div
          id="TestimonialRow"
          data-ui="TestimonialRow"
          className="mt-[clamp(1.5rem,4vw,4rem)] grid grid-cols-1 gap-4 phone:grid-cols-2 md:flex md:flex-row md:items-stretch md:gap-0"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              fanned={fanned}
              overlap={OVERLAP_PX}
              active={activeId === testimonial.id}
              onHover={setHoveredId}
              onFocus={setFocusedId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
