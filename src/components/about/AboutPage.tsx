"use client";

import { useEffect, useRef, useState } from "react";
import { about } from "@/content/about";
import { asset } from "@/lib/asset";

function AboutCarousel() {
  const slides = about.carousel;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div
      id="AboutCarousel"
      data-ui="AboutCarousel"
      className="relative w-full pr-9 pb-8"
    >
      <div className="relative aspect-[3/4] w-full">
        {slides.map((slide, i) => {
          const order = (i - index + slides.length) % slides.length;
          const visible = order < 3;
          return (
            <div
              key={slide.src}
              data-ui="AboutCarouselSlide"
              className="absolute inset-0 overflow-hidden rounded-[20px] shadow-[0_10px_28px_rgba(0,0,0,0.12)] transition-[transform,opacity] duration-500 ease-out"
              style={{
                zIndex: slides.length - order,
                transform: `translate(${order * 14}px, ${order * 12}px) scale(${1 - order * 0.06})`,
                opacity: visible ? 1 : 0,
                pointerEvents: order === 0 ? "auto" : "none",
              }}
              aria-hidden={order !== 0}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(slide.src)}
                alt={order === 0 ? slide.alt : ""}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(value);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1200;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <p
      ref={ref}
      className="font-display text-h1 font-medium text-[#000000]"
    >
      {shown}
      {suffix}
    </p>
  );
}

function AboutStats() {
  return (
    <section id="AboutStats" data-ui="AboutStats" className="mt-4">
      <div className="grid grid-cols-3 gap-2">
        {about.stats.map((stat) => (
          <div
            key={stat.id}
            id={stat.id}
            data-ui={stat.id}
            className="rounded-[16px] bg-[#F7F7F7] px-1.5 py-3 text-center md:px-2 md:py-4"
          >
            <CountUp value={stat.value} suffix={stat.suffix} />
            <p className="mt-1 text-label leading-snug text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <a
          id="AboutContactCta"
          data-ui="AboutContactCta"
          href={about.contactCta.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center rounded-pill bg-pill px-6 text-body text-white transition-transform duration-300 hover:scale-[1.03]"
        >
          {about.contactCta.label}
        </a>
      </div>
    </section>
  );
}

function AboutIntro() {
  return (
    <section
      id="AboutIntro"
      data-ui="AboutIntro"
      className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12"
    >
      <div className="md:col-span-7">
        <h1
          id="AboutHeadline"
          data-ui="AboutHeadline"
          className="max-w-3xl font-display text-h1 font-semibold text-[#000000]"
        >
          {about.headline}
        </h1>
        <div
          id="AboutBio"
          data-ui="AboutBio"
          className="mt-8 flex max-w-2xl flex-col gap-5 text-body text-ink"
        >
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="md:col-span-5">
        <AboutCarousel />
        <AboutStats />
      </div>
    </section>
  );
}

function AboutInterests() {
  return (
    <section id="AboutInterests" data-ui="AboutInterests" className="mt-20 md:mt-28">
      <h2
        id="AboutInterestsTitle"
        data-ui="AboutInterestsTitle"
        className="max-w-md font-display text-h2 font-semibold text-[#000000]"
      >
        {about.interestsTitle}
      </h2>
      <ul className="mt-8 flex flex-wrap gap-2.5">
        {about.interests.map((item) => (
          <li
            key={item}
            data-ui="AboutInterestChip"
            className="rounded-pill bg-[#F7F7F7] px-4 py-2 text-label text-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function AboutValues() {
  return (
    <section id="AboutValues" data-ui="AboutValues" className="mt-20 md:mt-28">
      <h2
        id="AboutValuesTitle"
        data-ui="AboutValuesTitle"
        className="max-w-md font-display text-h2 font-semibold text-[#000000]"
      >
        {about.valuesTitle}
      </h2>
      <div className="mt-10 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {about.values.map((value) => (
          <article
            key={value.id}
            id={value.id}
            data-ui={value.id}
            className="min-w-[220px] shrink-0 rounded-[20px] bg-[#F7F7F7] p-6 lg:min-w-0 lg:shrink"
          >
            <h3 className="font-display text-h3 font-semibold text-[#000000]">
              {value.title}
            </h3>
            <p className="mt-3 text-body text-ink">
              {value.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutBehindVideo({
  id,
  title,
  youtubeId,
}: {
  id: string;
  title: string;
  youtubeId: string;
}) {
  return (
    <div
      id={id}
      data-ui="AboutBehindVideo"
      className="overflow-hidden rounded-[16px] bg-[#F7F7F7]"
    >
      <iframe
        title={title}
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
        className="aspect-video w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

function AboutBehindTheScenes() {
  return (
    <section id="AboutBehindTheScenes" data-ui="AboutBehindTheScenes" className="mt-20 md:mt-28">
      <h2
        id="AboutBehindTitle"
        data-ui="AboutBehindTitle"
        className="max-w-lg font-display text-h2 font-semibold text-[#000000]"
      >
        {about.behindTitle}
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {about.behindTheScenes.map((video) => (
          <AboutBehindVideo
            key={video.id}
            id={video.id}
            title={video.title}
            youtubeId={video.youtubeId}
          />
        ))}
      </div>
    </section>
  );
}

function AboutBooks() {
  return (
    <section id="AboutBooks" data-ui="AboutBooks" className="mt-20 mb-8 md:mt-28">
      <h2
        id="AboutBooksTitle"
        data-ui="AboutBooksTitle"
        className="max-w-lg font-display text-h2 font-semibold text-[#000000]"
      >
        {about.booksTitle}
      </h2>
      <div className="mt-10 flex gap-4 overflow-x-auto pb-4 md:gap-6">
        {about.books.map((book) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={book.src}
            data-ui="AboutBookCover"
            src={asset(book.src)}
            alt={book.alt}
            className="h-56 w-auto shrink-0 rounded-[8px] object-cover shadow-sm phone:h-64 md:h-72"
          />
        ))}
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <main
      id="AboutPage"
      data-ui="AboutPage"
      className="mx-auto w-full max-w-page px-[var(--page-pad)] pb-16 pt-[70px] md:pb-24"
    >
      <AboutIntro />
      <AboutInterests />
      <AboutValues />
      <AboutBehindTheScenes />
      <AboutBooks />
    </main>
  );
}
