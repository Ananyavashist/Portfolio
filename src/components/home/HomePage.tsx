import { HeroSection } from "@/components/home/HeroSection";
import { ProjectGrid } from "@/components/home/ProjectGrid";

export function HomePage() {
  return (
    <main
      id="HomePage"
      data-ui="HomePage"
      className="mx-auto w-full max-w-page px-[var(--page-pad)] pb-4"
    >
      <div className="home-layout">
        <HeroSection />
        <ProjectGrid />
      </div>
    </main>
  );
}
