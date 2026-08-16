import { site } from "@/content/site";

export default function ResumePage() {
  return (
    <main
      id="ResumePlaceholder"
      data-ui="ResumePlaceholder"
      className="mx-auto w-full max-w-page px-[var(--page-pad)] py-16 md:py-24"
    >
      <p className="text-sm text-faint">Resume</p>
      <h1 className="mt-3 font-display text-[length:var(--hero-name)] font-semibold tracking-[-0.035em] text-ink">
        Resume
      </h1>
      <p className="mt-4 max-w-xl text-[length:var(--hero-bio)] leading-relaxed text-muted">
        This page will be designed next. The PDF is already linked from the homepage.
      </p>
      <a
        href={site.resumeUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex h-11 items-center rounded-pill bg-pill px-5 text-[0.92rem] text-white"
      >
        Open resume
      </a>
    </main>
  );
}
