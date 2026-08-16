import { notFound } from "next/navigation";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyPlaceholder({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main
      id="CaseStudyPlaceholder"
      data-ui="CaseStudyPlaceholder"
      className="mx-auto w-full max-w-page px-[var(--page-pad)] py-16 md:py-24"
    >
      <p className="text-[length:var(--body-size)] text-faint">{project.company}</p>
      <h1 className="mt-3 max-w-3xl font-display text-[length:var(--hero-name)] font-semibold tracking-[-0.035em] text-ink">
        {project.title}
      </h1>
      <p className="mt-4 max-w-xl text-[length:var(--body-size)] leading-relaxed text-muted">
        This case study will be designed next. The homepage card already routes here.
      </p>
    </main>
  );
}
