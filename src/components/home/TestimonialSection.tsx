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
      className="relative min-h-[100svh] bg-[#f7f7f7] font-project text-black"
    >
      <GridBackdrop />
      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-24 pt-20 sm:px-8 md:pb-32 md:pt-24 lg:px-10 lg:pb-36">
        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-[620px]">
            <h2 className="font-hero text-[30px] font-medium leading-[1.1] text-black md:text-[36px] lg:text-[40px]">
              What it’s like to build with me
            </h2>
            <p className="mt-4 text-[16px] leading-[1.5] text-black md:text-[18px] md:leading-[1.45]">
              A few words from teammates, mentors, and collaborators who’ve seen
              how I think, navigate ambiguity, and bring ideas to life
            </p>
          </div>

          <a
            id="MoreWordsLink"
            data-ui="MoreWordsLink"
            href={recommendationsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[42px] shrink-0 items-center justify-center self-start rounded-pill bg-[#2F368F] px-[22px] text-[15px] font-medium leading-none text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 md:self-auto md:text-[16px]"
          >
            More words
          </a>
        </header>

        <div
          id="TestimonialRow"
          data-ui="TestimonialRow"
          className="mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-stretch md:gap-0 lg:mt-16"
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
