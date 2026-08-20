"use client";

import { HeroArtboard } from "@/components/cinematic/HeroArtboard";

const STAGE_W = 1689;
const STAGE_H = 931;

export function LiveHero({ interactive: _interactive }: { interactive: boolean }) {
  return (
    <section
      id="LiveHero"
      data-ui="LiveHero"
      className="h-full w-full overflow-hidden bg-[#121212]"
    >
      <div
        id="HeroCanvas"
        data-ui="HeroCanvas"
        className="grid h-full w-full place-items-center overflow-hidden bg-[#121212]"
        style={{ containerType: "size" }}
      >
        <div
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transformOrigin: "center center",
            scale: "min(calc(100cqi / 1689px), calc(100cqh / 931px))",
          }}
        >
          <HeroArtboard />
        </div>
      </div>
    </section>
  );
}
