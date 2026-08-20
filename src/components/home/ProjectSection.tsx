"use client";

import { useEffect, useState } from "react";
import {
  filterProjects,
  projectFilters,
  projects,
  type ProjectFilter,
} from "@/content/projects";
import { ProjectGrid } from "@/components/home/ProjectGrid";

export function ProjectSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => {
      setShowFilters(media.matches);
      if (!media.matches) setActiveFilter("all");
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const visibleProjects = showFilters
    ? filterProjects(activeFilter)
    : projects;

  return (
    <section
      id="ProjectSection"
      data-ui="ProjectSection"
      className="relative bg-white pb-[var(--portfolio-dock-clearance)] font-project text-black"
    >
      <div className="relative mx-auto w-full max-w-[1650px] px-[clamp(1.25rem,4vw,2.5rem)] pb-[clamp(4rem,10vw,9rem)] pt-[clamp(3.5rem,8vw,6rem)]">
        <header className="flex flex-col gap-8 [container-type:inline-size]">
          <h2 className="whitespace-nowrap font-handwritten font-semibold leading-[1.1] tracking-[-0.045em] text-black [font-size:min(var(--type-section-display),calc(100cqi/18))] [font-weight:600]">
            Shipped, Learned, Iterated
          </h2>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
            <p className="max-w-[560px] text-body leading-[1.5] text-black">
              Projects that challenged how I approach products, systems, people,
              and technology.
            </p>

          {showFilters ? (
            <div
              id="ProjectFilters"
              data-ui="ProjectFilters"
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter projects"
            >
              {projectFilters.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`h-[42px] rounded-pill px-[22px] text-body font-medium leading-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                      isActive
                        ? "border border-transparent bg-[#2F368F] text-white"
                        : "border border-[#dfdfdf] bg-white text-black"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          ) : null}
          </div>
        </header>

        <div className="mt-10 md:mt-14 lg:mt-16">
          <ProjectGrid projects={visibleProjects} />
        </div>
      </div>
    </section>
  );
}
