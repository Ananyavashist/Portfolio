"use client";

import type { MouseEvent } from "react";
import { ArrowRight } from "iconsax-reactjs";
import { asset } from "@/lib/asset";
import { cinematic } from "@/content/cinematic";
import { DOCK_NAVIGATE_EVENT } from "@/content/dockNavigation";
import { ProjectMediaFrame } from "@/components/cinematic/ProjectMediaFrame";
import styles from "./HeroArtboard.module.css";

function goToProjects(
  event: MouseEvent<HTMLAnchorElement>,
  interactive: boolean,
) {
  event.preventDefault();
  if (!interactive) return;
  window.dispatchEvent(
    new CustomEvent(DOCK_NAVIGATE_EVENT, {
      detail: { targetId: "ProjectsCard" },
    }),
  );
}

export function HeroArtboard({
  overlay = false,
  interactive = false,
}: {
  overlay?: boolean;
  interactive?: boolean;
}) {
  return (
    <div
      id="HeroArtboard"
      data-ui="HeroArtboard"
      className={`${styles.stage} ${interactive ? styles.interactive : ""}`}
    >
      <div className={styles.artboard}>
        <div className={styles.grain} aria-hidden />
      </div>

      <p className={`${styles.word} ${styles.crafting}`}>Crafting</p>
      <p className={`${styles.word} ${styles.solution}`}>solution</p>
      <p className={`${styles.word} ${styles.b2b2c}`}>B2B2C</p>
      <p className={`${styles.word} ${styles.for}`}>for</p>
      <p className={`${styles.word} ${styles.enterprise}`}>enterprise</p>
      <p className={`${styles.word} ${styles.startups}`}>Startups</p>
      <p className={`${styles.word} ${styles.mncs}`}>MNCs</p>

      <div className={styles.mediaGroup}>
        <ProjectMediaFrame />
        <a
          id="HeroBuildAction"
          data-ui="HeroBuildAction"
          href="#ProjectsCard"
          className={styles.action}
          tabIndex={interactive ? 0 : -1}
          aria-disabled={!interactive}
          aria-label="View work"
          onClick={(event) => goToProjects(event, interactive)}
        >
          <span className={styles.actionRing} />
          <span className={styles.actionCore}>
            <ArrowRight size={18} color="#ffffff" variant="Linear" aria-hidden />
          </span>
        </a>
        <a
          id="HeroBuildLink"
          data-ui="HeroBuildLink"
          href="#ProjectsCard"
          className={styles.build}
          tabIndex={interactive ? 0 : -1}
          aria-disabled={!interactive}
          onClick={(event) => goToProjects(event, interactive)}
        >
          view work
        </a>
      </div>

      <p id="HeroIdentity" data-ui="HeroIdentity" className={styles.identity}>
        {cinematic.hero.corners.topLeft}
      </p>
      <p id="HeroSupport" data-ui="HeroSupport" className={styles.support}>
        {cinematic.hero.corners.topRight.map((line, index) => (
          <span key={line}>
            {line}
            {index < cinematic.hero.corners.topRight.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>

      {overlay ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.overlay}
          src={asset("/reference.png")}
          alt=""
          aria-hidden
        />
      ) : null}
    </div>
  );
}
