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
      className="relative bg-white font-project text-black"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-24 pt-20 sm:px-8 md:pb-32 md:pt-24 lg:px-10 lg:pb-36">
        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-[560px]">
            <h2 className="font-handwritten text-[30px] font-normal leading-[1.1] text-black md:text-[36px] lg:text-[40px]">
              Shipped, Learned, Iterated
            </h2>
            <p className="mt-4 text-[16px] leading-[1.5] text-black md:text-[18px] md:leading-[1.45]">
              Projects that challenged how I approach products, systems, people,
              and technology.
            </p>
          </div>

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
                    className={`h-[42px] rounded-pill px-[22px] text-[15px] font-medium leading-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 md:text-[16px] ${
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
        </header>

        <div className="mt-10 md:mt-14 lg:mt-16">
          <ProjectGrid projects={visibleProjects} />
        </div>
      </div>
    </section>
  );
}
