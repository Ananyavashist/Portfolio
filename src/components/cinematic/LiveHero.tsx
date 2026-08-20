"use client";

import { HeroArtboard } from "@/components/cinematic/HeroArtboard";

const CANVAS = "#fafafa";

export function LiveHero({ interactive }: { interactive: boolean }) {
  return (
    <section
      id="LiveHero"
      data-ui="LiveHero"
      className="h-full w-full overflow-hidden"
      style={{ background: CANVAS }}
    >
      <div
        id="HeroCanvas"
        data-ui="HeroCanvas"
        data-hero-stage-scale={1}
        className="relative h-full w-full overflow-hidden"
        style={{ background: CANVAS }}
      >
        <div className="absolute inset-0">
          <HeroArtboard interactive={interactive} />
        </div>
      </div>
    </section>
  );
}
