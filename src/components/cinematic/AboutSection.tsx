import { cinematic } from "@/content/cinematic";
import { asset } from "@/lib/asset";
import { MetricsRow } from "@/components/cinematic/AnimatedMetric";

const linkClass =
  "text-black underline decoration-black underline-offset-2 hover:decoration-black/80";

export function AboutSection({ metricsActive }: { metricsActive?: boolean }) {
  const { about } = cinematic;

  return (
    <section
      id="AboutSection"
      data-ui="AboutSection"
      className="relative flex h-full w-full flex-col items-center justify-center bg-white px-6 py-12 font-hero text-black md:px-10"
      style={{
        backgroundImage: `url(${asset("/about/background-grid.jpg")})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "top left",
        backgroundSize: "auto",
      }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1250px] flex-col items-center text-center">
        <p className="w-full text-[26px] leading-[1.45]">
          {about.intro}
        </p>
        <p className="mt-8 w-full text-[26px] leading-[1.45]">
          Previously, she designed at{" "}
          {about.companies.map((company, index) => (
            <span key={company.label}>
              {index > 0 ? ", " : null}
              <a
                href={company.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {company.label}
              </a>
            </span>
          ))}{" "}
          {about.historySuffix}
        </p>
        <MetricsRow stats={about.stats} active={metricsActive} />
      </div>
    </section>
  );
}
