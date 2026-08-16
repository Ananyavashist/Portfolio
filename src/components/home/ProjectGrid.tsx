import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/home/ProjectCard";

export function ProjectGrid() {
  return (
    <div id="ProjectGrid" data-ui="ProjectGrid" className="contents">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
