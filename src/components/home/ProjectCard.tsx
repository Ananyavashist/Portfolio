"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/content/projects";
import { asset } from "@/lib/asset";
import { fadeUp } from "@/lib/motion";

function ProjectMedia({ project }: { project: Project }) {
  return (
    <div
      id={`${project.id}Media`}
      data-ui="ProjectMedia"
      className="relative overflow-hidden rounded-media bg-neutral-100"
    >
      {project.media.type === "video" ? (
        <video
          className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          src={asset(project.media.src)}
          poster={project.media.poster ? asset(project.media.poster) : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(project.media.src)}
          alt={project.title}
          className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}

function ProjectTitle({ title }: { title: string }) {
  return (
    <p
      data-ui="ProjectTitle"
      className="min-w-0 flex-1 text-[length:var(--meta-size)] leading-snug tracking-[-0.01em] text-ink [overflow-wrap:anywhere]"
    >
      {title}
    </p>
  );
}

function ProjectCompany({ company }: { company: string }) {
  return (
    <p
      data-ui="ProjectCompany"
      className="shrink-0 text-[length:var(--meta-size)] text-muted"
    >
      {company}
    </p>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      id={project.id}
      data-ui={project.id}
      data-offset={project.offset}
      className="project-card group"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={project.href} className="block">
        <ProjectMedia project={project} />
        <div
          data-ui="ProjectMeta"
          className="mt-3 flex flex-col items-start gap-1 phone:mt-3.5 phone:flex-row phone:justify-between phone:gap-4 md:mt-4"
        >
          <ProjectTitle title={project.title} />
          <ProjectCompany company={project.company} />
        </div>
      </Link>
    </motion.article>
  );
}
