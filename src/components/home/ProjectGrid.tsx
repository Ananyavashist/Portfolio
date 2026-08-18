"use client";

import { AnimatePresence, LayoutGroup } from "motion/react";
import type { Project } from "@/content/projects";
import { ProjectCard } from "@/components/home/ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <LayoutGroup id="ProjectGrid">
      <div
        id="ProjectGrid"
        data-ui="ProjectGrid"
        className="relative grid grid-cols-1 gap-y-11 md:grid-cols-2 md:gap-x-5 md:gap-y-14 lg:gap-x-6 lg:gap-y-16"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
