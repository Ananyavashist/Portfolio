import { site } from "@/content/site";

export default function AboutPage() {
  return (
    <main
      id="AboutPlaceholder"
      data-ui="AboutPlaceholder"
      className="mx-auto w-full max-w-page px-[var(--page-pad)] py-16 md:py-24"
    >
      <p className="text-sm text-faint">About</p>
      <h1 className="mt-3 font-display text-[length:var(--hero-name)] font-semibold tracking-[-0.035em] text-ink">
        {site.name}
      </h1>
      <p className="mt-4 max-w-xl text-[length:var(--hero-bio)] leading-relaxed text-muted">
        This page will be designed next. The homepage, header, and footer are in place.
      </p>
    </main>
  );
}
