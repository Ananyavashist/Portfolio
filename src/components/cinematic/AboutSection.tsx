"use client";

import type { MotionValue } from "motion/react";
import { cinematic } from "@/content/cinematic";
import { MetricsRow } from "@/components/cinematic/AnimatedMetric";
import { CompanyLogoRail } from "@/components/cinematic/CompanyLogoRail";
import { GridBackdrop } from "@/components/core/GridBackdrop";
import { asset } from "@/lib/asset";

const linkClass =
  "text-black underline decoration-black underline-offset-2 hover:decoration-black/80";

export function AboutSection({
  metricsActive,
  overlayProgress,
}: {
  metricsActive?: boolean;
  overlayProgress?: MotionValue<number>;
}) {
  const { about } = cinematic;

  return (
    <section
      id="AboutSection"
      data-ui="AboutSection"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-white px-[clamp(1rem,4vw,2.5rem)] py-[clamp(1.5rem,4vh,3rem)] font-project text-black"
    >
      <GridBackdrop />
      <CompanyLogoRail overlayProgress={overlayProgress} />
      <div className="relative z-10 mx-auto flex w-full max-w-[1300px] flex-col items-center">
        <div className="flex w-full max-w-[1000px] flex-col items-center text-center">
          <p className="w-full text-h2 font-semibold leading-[1.45]">
            {about.intro}
          </p>
          <p className="mt-[clamp(1.25rem,3vw,2rem)] w-full text-h2 font-semibold leading-[1.45]">
            Previously, she designed at{" "}
            {about.companies.map((company, index) => (
              <span key={company.label}>
                {index > 0 ? ", " : null}
                <a
                  href={company.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {company.label}
                </a>
              </span>
            ))}{" "}
            {about.historySuffix}
          </p>
        </div>
        <MetricsRow stats={about.stats} active={metricsActive} />
        <ul
          className="mt-[clamp(1.5rem,4vw,2.5rem)] flex w-full max-w-[1000px] flex-wrap items-center justify-center gap-x-6 gap-y-4 md:hidden"
          aria-hidden
        >
          {about.logos.map((logo) => (
            <li key={logo.id} className="h-[clamp(36px,10vw,52px)] w-[clamp(36px,10vw,52px)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(logo.src)}
                alt=""
                className="h-full w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
