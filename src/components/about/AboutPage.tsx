"use client";

import { useEffect, useRef, useState } from "react";
import { about } from "@/content/about";
import { asset } from "@/lib/asset";

function AboutIntro() {
  return (
    <section
      id="AboutIntro"
      data-ui="AboutIntro"
      className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12"
    >
      <div className="md:col-span-7">
        <p
          id="AboutBadge"
          data-ui="AboutBadge"
          className="text-sm text-muted"
        >
          {about.badge}
        </p>
        <h1
          id="AboutHeadline"
          data-ui="AboutHeadline"
          className="mt-4 max-w-3xl font-display text-[clamp(1.7rem,3.4vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-[#000000]"
        >
          {about.headline}
        </h1>
        <div
          id="AboutBio"
          data-ui="AboutBio"
          className="mt-8 flex max-w-2xl flex-col gap-5 text-[length:var(--hero-bio)] leading-[1.7] text-ink"
        >
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="md:col-span-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="AboutPortrait"
          data-ui="AboutPortrait"
          src={asset(about.portrait.src)}
          alt={about.portrait.alt}
          className="w-full rounded-[20px] object-cover"
        />
      </div>
    </section>
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
      className="font-display text-[clamp(2.4rem,5vw,4rem)] font-medium tracking-[-0.03em] text-[#000000]"
    >
      {shown}
      {suffix}
    </p>
  );
}

function AboutStats() {
  return (
    <section id="AboutStats" data-ui="AboutStats" className="mt-16 md:mt-24">
      <div className="grid grid-cols-1 gap-3 phone:grid-cols-3">
        {about.stats.map((stat) => (
          <div
            key={stat.id}
            id={stat.id}
            data-ui={stat.id}
            className="rounded-[20px] bg-[#F7F7F7] px-6 py-8 text-center md:px-8 md:py-10"
          >
            <CountUp value={stat.value} suffix={stat.suffix} />
            <p className="mt-3 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <a
          id="AboutContactCta"
          data-ui="AboutContactCta"
          href={about.contactCta.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center rounded-pill bg-pill px-6 text-[0.92rem] text-white transition-transform duration-300 hover:scale-[1.03]"
        >
          {about.contactCta.label}
        </a>
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
        className="max-w-md font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.035em] text-[#000000]"
      >
        {about.interestsTitle}
      </h2>
      <ul className="mt-8 flex flex-wrap gap-2.5">
        {about.interests.map((item) => (
          <li
            key={item}
            data-ui="AboutInterestChip"
            className="rounded-pill bg-[#F7F7F7] px-4 py-2 text-sm text-ink"
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
        className="max-w-md font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.035em] text-[#000000]"
      >
        {about.valuesTitle}
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {about.values.map((value) => (
          <article
            key={value.id}
            id={value.id}
            data-ui={value.id}
            className="rounded-[20px] bg-[#F7F7F7] p-6 md:p-8"
          >
            <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-[#000000]">
              {value.title}
            </h3>
            <p className="mt-3 text-[length:var(--hero-bio)] leading-relaxed text-ink">
              {value.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutBehindTheScenes() {
  return (
    <section id="AboutBehindTheScenes" data-ui="AboutBehindTheScenes" className="mt-20 md:mt-28">
      <h2
        id="AboutBehindTitle"
        data-ui="AboutBehindTitle"
        className="max-w-lg font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.035em] text-[#000000]"
      >
        {about.behindTitle}
      </h2>
      <div className="mt-10 columns-2 gap-3 md:columns-3 md:gap-4">
        {about.behindTheScenes.map((photo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={photo.src}
            data-ui="AboutBehindPhoto"
            src={asset(photo.src)}
            alt={photo.alt}
            className="mb-3 w-full break-inside-avoid rounded-[16px] object-cover md:mb-4"
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
        className="max-w-lg font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.035em] text-[#000000]"
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
      className="mx-auto w-full max-w-page px-[var(--page-pad)] pb-16 pt-4 md:pb-24 md:pt-8"
    >
      <AboutIntro />
      <AboutStats />
      <AboutInterests />
      <AboutValues />
      <AboutBehindTheScenes />
      <AboutBooks />
    </main>
  );
}
