import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/home/ProjectCard";

export function ProjectGrid() {
  return (
    <div
      id="ProjectGrid"
      data-ui="ProjectGrid"
      className="grid grid-cols-1 gap-5 md:grid-cols-2"
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
