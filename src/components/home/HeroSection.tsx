"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { latestWorkHref } from "@/content/projects";
import { site } from "@/content/site";
import { fadeUp, stagger } from "@/lib/motion";

function HeroName() {
  return (
    <motion.h1
      id="HeroName"
      data-ui="HeroName"
      variants={fadeUp}
      className="font-display text-[length:var(--hero-name)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#000000]"
    >
      {site.name}
    </motion.h1>
  );
}

function HeroBio() {
  return (
    <motion.p
      id="HeroBio"
      data-ui="HeroBio"
      variants={fadeUp}
      className="mt-4 max-w-[34rem] text-[length:var(--hero-bio)] leading-[1.55] text-muted [overflow-wrap:anywhere] md:mt-5"
    >
      {site.description}
    </motion.p>
  );
}

function HeroCtaPrimary() {
  return (
    <motion.div variants={fadeUp}>
      <Link
        id="HeroCtaPrimary"
        data-ui="HeroCtaPrimary"
        href={latestWorkHref}
        className="inline-flex h-11 items-center rounded-pill bg-pill px-5 text-[0.92rem] text-white transition-transform duration-300 hover:scale-[1.03] phone:h-12 phone:px-6"
      >
        My latest work
      </Link>
    </motion.div>
  );
}

function HeroCtaSecondary() {
  return (
    <motion.div variants={fadeUp}>
      <a
        id="HeroCtaSecondary"
        data-ui="HeroCtaSecondary"
        href={site.resumeUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center rounded-pill border border-[#F9F9F9] bg-[#F9F9F9] px-5 text-[0.92rem] text-ink transition-transform duration-300 hover:scale-[1.03] phone:h-12 phone:px-6"
      >
        Resume
      </a>
    </motion.div>
  );
}

function HeroCtaGroup() {
  return (
    <div
      id="HeroCtaGroup"
      data-ui="HeroCtaGroup"
      className="mt-7 flex flex-wrap items-center gap-5 phone:mt-8 md:mt-9"
    >
      <HeroCtaPrimary />
      <HeroCtaSecondary />
    </div>
  );
}

export function HeroSection() {
  return (
    <motion.section
      id="HeroSection"
      data-ui="HeroSection"
      className="home-hero max-w-xl pb-4 md:pb-8"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <HeroName />
      <HeroBio />
      <HeroCtaGroup />
    </motion.section>
  );
}
