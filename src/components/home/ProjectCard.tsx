"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Transition } from "motion/react";
import type { Project } from "@/content/projects";
import { asset } from "@/lib/asset";

function ProjectMetadata({ tags }: { tags: string[] }) {
  return (
    <div
      data-ui="ProjectMetadata"
      className="mt-3 flex flex-wrap items-center gap-[10px] text-label font-medium uppercase leading-[1.3] tracking-normal md:mt-3.5 lg:mt-4"
    >
      {tags.flatMap((tag, index) => {
        const items = [
          <span
            key={tag}
            className={
              tag === "SHIPPED" ? "text-[#4e9652]" : "text-[#adadad]"
            }
          >
            {tag}
          </span>,
        ];
        if (index > 0) {
          items.unshift(
            <span key={`${tag}-sep`} className="text-[#adadad]" aria-hidden>
              •
            </span>,
          );
        }
        return items;
      })}
    </div>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const media = project.media;

  return (
    <div
      id={`${project.id}Media`}
      data-ui="ProjectMedia"
      data-project-media=""
      data-cursor="card"
      data-cursor-label={project.cursorLabel ?? `View ${project.company}`}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-media bg-neutral-100"
    >
      {media.type === "video" ? (
        <video
          className="h-full w-full object-cover object-center"
          src={asset(media.src)}
          poster={media.poster ? asset(media.poster) : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(media.src)}
          alt=""
          className="h-full w-full object-cover object-center transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/media:scale-[1.015]"
        />
      )}
    </div>
  );
}

const cardTransition: Transition = {
  layout: {
    type: "spring",
    stiffness: 280,
    damping: 30,
    mass: 0.7,
  },
  opacity: {
    duration: 0.22,
    ease: "easeOut",
  },
};

export function ProjectCard({ project }: { project: Project }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      id={project.id}
      data-ui={project.id}
      layout
      initial={{ opacity: 0, y: 8, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.985 }
      }
      transition={reducedMotion ? { duration: 0 } : cardTransition}
      className="group/media min-w-0"
    >
      <Link
        href={project.href}
        aria-label={`View ${project.company} case study`}
        className="block rounded-media focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      >
        <ProjectMedia project={project} />
        <h3
          data-ui="ProjectHeadline"
          className="mt-3 text-h5 font-semibold leading-[1.4] text-black [overflow-wrap:anywhere] lg:mt-4"
        >
          {project.headline}
        </h3>
        <ProjectMetadata tags={project.metadata} />
      </Link>
    </motion.article>
  );
}
