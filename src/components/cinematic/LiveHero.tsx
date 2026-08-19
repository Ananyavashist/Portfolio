"use client";

import { useEffect, useRef, useState } from "react";
import { cinematic, heroCards } from "@/content/cinematic";
import { HeroCardLayer } from "@/components/cinematic/HeroCardLayer";
import { asset } from "@/lib/asset";

function HeroHeader({ interactive }: { interactive: boolean }) {
  const { hero } = cinematic;

  return (
    <div
      id="HeroHeader"
      data-ui="HeroHeader"
      className="pointer-events-none absolute z-50 flex justify-between leading-[1.25] text-white [&>*]:shrink-0"
      style={{
        left: "8%",
        right: "8%",
        top: "8.5%",
        fontSize: "calc(26px * var(--k, 1))",
      }}
    >
      <p id="HeroMetaName" data-ui="HeroMetaName">
        {hero.name}
        <br />
        {hero.year}
      </p>
      <p id="HeroMetaRole" data-ui="HeroMetaRole">
        {hero.role}
        <br />
        {hero.location}
      </p>
      <p id="HeroMetaCraft" data-ui="HeroMetaCraft">
        {hero.craft}
        <br />
        <span className="whitespace-nowrap">{hero.craftNote}</span>
      </p>
      <a
        id="HeroDesignLink"
        data-ui="HeroDesignLink"
        href={hero.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={interactive ? 0 : -1}
        aria-label={`${hero.design} ${hero.contentCreator} on Instagram`}
        className={`text-white no-underline hover:underline focus:outline-none focus-visible:underline ${interactive ? "pointer-events-auto underline-offset-2" : "pointer-events-none"}`}
      >
        {hero.design}
        <br />
        <span className="whitespace-nowrap">{hero.contentCreator}</span>
      </a>
    </div>
  );
}

function HeroBackground() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      id="HeroBackground"
      data-ui="HeroBackground"
      src={asset("/intro/hero-final-background.png")}
      alt=""
      aria-hidden
      draggable={false}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
      style={{ opacity: 0.2 }}
    />
  );
}

export function LiveHero({ interactive }: { interactive: boolean }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canDrag, setCanDrag] = useState(false);

  // A draggable element gets `touch-action: none`, which would swallow the
  // vertical swipe this pinned hero depends on. Dragging is for mice only.
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanDrag(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="LiveHero"
      data-ui="LiveHero"
      className="h-full w-full bg-[var(--cinematic-navy)] font-hero"
    >
      <div
        id="HeroCanvas"
        data-ui="HeroCanvas"
        ref={canvasRef}
        onClick={() => interactive && setActiveId(null)}
        className="relative h-full w-full overflow-hidden bg-[var(--cinematic-navy)]"
        style={{ containerType: "size" }}
      >
        <HeroBackground />
        <div
          id="HeroCollage"
          data-ui="HeroCollage"
          className="absolute left-1/2 top-[55.85%] z-10"
          style={{
            width:
              "min(calc(1500px * var(--k, 1)), max(calc(1232px * var(--k, 1)), 84.96cqw), 90cqw, calc(64.9cqh * 2.2656))",
            aspectRatio: "2.2656",
            transform: "translate(-50%, -50%)",
            pointerEvents: interactive ? "auto" : "none",
          }}
        >
          {heroCards.map((card) => (
            <HeroCardLayer
              key={card.id}
              card={card}
              interactive={interactive}
              draggable={interactive && canDrag}
              constraintsRef={canvasRef}
              active={activeId === card.id}
              onActivate={setActiveId}
            />
          ))}
        </div>
        <HeroHeader interactive={interactive} />
      </div>
    </section>
  );
}
