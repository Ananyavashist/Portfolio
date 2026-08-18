"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, useMotionValue } from "motion/react";
import type { Project } from "@/content/projects";
import { ExploreCursor } from "@/components/home/ExploreCursor";
import { ProjectCard } from "@/components/home/ProjectCard";

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function findMediaTarget(node: EventTarget | null, x: number, y: number) {
  if (node instanceof Element) {
    const fromTarget = node.closest("[data-project-media]");
    if (fromTarget instanceof HTMLElement) return fromTarget;
  }
  const hit = document.elementFromPoint(x, y);
  return hit?.closest("[data-project-media]") ?? null;
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const pillMeasureRef = useRef<HTMLSpanElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const [cursorActive, setCursorActive] = useState(false);

  const updateCursor = useCallback(
    (clientX: number, clientY: number, target: EventTarget | null) => {
      const media = findMediaTarget(target, clientX, clientY);
      if (!(media instanceof HTMLElement)) {
        setCursorActive(false);
        return;
      }

      const rect = media.getBoundingClientRect();
      const pillWidth = pillMeasureRef.current?.offsetWidth ?? 160;
      const pillHeight = pillMeasureRef.current?.offsetHeight ?? 40;
      const padding = 12;

      const localX = clientX - rect.left;
      const localY = clientY - rect.top;

      const clampedX = clamp(
        pillWidth / 2 + padding,
        localX,
        rect.width - pillWidth / 2 - padding,
      );
      const clampedY = clamp(
        pillHeight / 2 + padding,
        localY,
        rect.height - pillHeight / 2 - padding,
      );

      pointerX.set(rect.left + clampedX);
      pointerY.set(rect.top + clampedY);
      setCursorActive(true);
    },
    [pointerX, pointerY],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      updateCursor(event.clientX, event.clientY, event.target);
    },
    [updateCursor],
  );

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const next = event.relatedTarget;
      if (next instanceof Node && gridRef.current?.contains(next)) return;
      setCursorActive(false);
    },
    [],
  );

  return (
    <LayoutGroup id="ProjectGrid">
      <div
        ref={gridRef}
        id="ProjectGrid"
        data-ui="ProjectGrid"
        className="relative grid grid-cols-1 gap-y-11 md:grid-cols-2 md:gap-x-5 md:gap-y-14 lg:gap-x-6 lg:gap-y-16"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </div>
      <ExploreCursor active={cursorActive} x={pointerX} y={pointerY} />
      <span
        ref={pillMeasureRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 inline-flex items-center gap-2 whitespace-nowrap rounded-pill bg-black px-[17px] py-3 text-[13px] font-semibold tracking-[0.02em] text-white opacity-0"
      >
        VIEW CASE STUDY
      </span>
    </LayoutGroup>
  );
}
