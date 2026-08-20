"use client";

import { asset } from "@/lib/asset";
import styles from "./HeroArtboard.module.css";

function StarIcon() {
  return (
    <svg
      className={styles.star}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x="8.15"
          y="1.1"
          width="1.7"
          height="3.4"
          rx="0.4"
          fill="#080808"
          transform={`rotate(${i * 45} 9 9)`}
        />
      ))}
    </svg>
  );
}

function Lightning() {
  return (
    <svg width="16" height="22" viewBox="0 0 16 22" fill="none" aria-hidden>
      <path
        d="M9.6 1.2 1.8 12.4h5.3L5.4 20.8l8.6-12.1H8.6L9.6 1.2Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function HeroArtboard({
  overlay = false,
}: {
  overlay?: boolean;
}) {
  return (
    <div id="HeroArtboard" data-ui="HeroArtboard" className={styles.stage}>
      <div className={styles.artboard}>
        <div className={styles.grain} aria-hidden />
      </div>

      <p className={styles.watermark} aria-hidden>
        dc-dev
      </p>

      <p className={`${styles.word} ${styles.crafting}`}>Crafting</p>
      <p className={`${styles.word} ${styles.solution}`}>solution</p>
      <p className={`${styles.word} ${styles.b2b2c}`}>B2B2C</p>
      <p className={`${styles.word} ${styles.for}`}>for</p>
      <p className={`${styles.word} ${styles.enterprise}`}>enterprise</p>
      <p className={`${styles.word} ${styles.startups}`}>Startups</p>
      <p className={`${styles.word} ${styles.mncs}`}>MNCs</p>

      <article className={styles.card} aria-label="Services">
        <p className={styles.cardHeader}>Ananya @2026</p>
        <p className={styles.cardPrimary}>
          We have all the services
          <br />
          you need to look after your
          <br />
          online presence.
        </p>
        <p className={styles.cardSecondary}>
          From web design, personalized
          <br />
          email addresses, hosting, CDN&apos;s
          <br />
          to business IT support.
        </p>
        <span className={styles.details}>
          <span className={styles.detailsWord}>Details</span>
          <span className={styles.detailsArrow} aria-hidden>
            ↗
          </span>
        </span>
      </article>

      <div className={styles.action} aria-hidden={false}>
        <span className={styles.actionRing} />
        <span className={styles.actionCore}>
          <Lightning />
        </span>
      </div>
      <p className={styles.build}>Build with us</p>

      <StarIcon />
      <p className={styles.identity}>Ananya @2026</p>
      <p className={styles.support}>
        We want to
        <br />
        make sure you
        <br />
        always have
        <br />
        someone you
        <br />
        can turn to
        <br />
        help.
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
