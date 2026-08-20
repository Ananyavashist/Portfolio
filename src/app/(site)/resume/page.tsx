import { site } from "@/content/site";

export default function ResumePage() {
  return (
    <main
      id="ResumePlaceholder"
      data-ui="ResumePlaceholder"
      className="mx-auto w-full max-w-page px-[var(--page-pad)] py-[clamp(3.5rem,8vw,6rem)]"
    >
      <p className="text-label text-faint">Resume</p>
      <h1 className="mt-3 font-display text-h1 font-semibold text-ink">
        Resume
      </h1>
      <p className="mt-4 max-w-xl text-body text-muted">
        This page will be designed next. The PDF is already linked from the homepage.
      </p>
      <a
        href={site.resumeUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex h-11 items-center rounded-pill bg-pill px-5 text-body text-white"
      >
        Open resume
      </a>
    </main>
  );
}
