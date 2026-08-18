"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cinematic } from "@/content/cinematic";
import { asset } from "@/lib/asset";

type Logo = (typeof cinematic.about.logos)[number];

const ENTER_START = 0.4;
const ENTER_END = 0.65;

function clampProgress(value: number, start: number, end: number) {
  if (value <= start) return 0;
  if (value >= end) return 1;
  return (value - start) / (end - start);
}

function LogoMark({
  logo,
  progress,
  index,
}: {
  logo: Logo;
  progress: MotionValue<number>;
  index: number;
}) {
  const slideDistance = logo.side === "left" ? -96 : 96;
  const size = logo.size ?? 72;
  const stagger = index * 0.04;

  const opacity = useTransform(progress, (value) => {
    return clampProgress(value, ENTER_START + stagger, ENTER_END + stagger);
  });

  const scale = useTransform(progress, (value) => {
    const t = clampProgress(value, ENTER_START + stagger, ENTER_END + stagger);
    return 0.82 + t * 0.18;
  });

  const xOffset = useTransform(progress, (value) => {
    const t = clampProgress(value, ENTER_START + stagger, ENTER_END + stagger);
    return slideDistance * (1 - t);
  });

  return (
    <motion.span
      id={logo.id}
      data-ui={logo.id}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center will-change-transform"
      style={{
        left: `${logo.x}%`,
        top: `${logo.y}%`,
        x: xOffset,
        scale,
        opacity,
        rotate: logo.rotate,
        width: size,
        height: size,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(logo.src)}
        alt=""
        className="h-full w-full object-contain"
      />
    </motion.span>
  );
}

export function CompanyLogoRail({
  overlayProgress,
}: {
  overlayProgress?: MotionValue<number>;
}) {
  const rest = useMotionValue(1);
  const progress = overlayProgress ?? rest;

  return (
    <div
      id="CompanyLogoRail"
      data-ui="CompanyLogoRail"
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden md:block"
    >
      {cinematic.about.logos.map((logo, index) => (
        <LogoMark key={logo.id} logo={logo} progress={progress} index={index} />
      ))}
    </div>
  );
}
