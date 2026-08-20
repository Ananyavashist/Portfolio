"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { amount: 0, suffix: value };
  return { amount: Number(match[1]), suffix: match[2] };
}

function AnimatedMetric({
  value,
  active,
}: {
  value: string;
  active: boolean;
}) {
  const { amount, suffix } = parseStat(value);
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(amount);
      return;
    }
    if (!active) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, amount, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [active, amount, reducedMotion]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export function MetricsRow({
  stats,
  active,
}: {
  stats: readonly { value: string; label: string }[];
  active?: boolean;
}) {
  const ref = useRef<HTMLDListElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const playing = active ?? inView;

  return (
    <dl
      ref={ref}
      className="mt-[clamp(1.5rem,5vw,3.75rem)] flex w-full flex-row flex-wrap items-start justify-center gap-x-[clamp(1.25rem,8vw,7.5rem)] gap-y-5"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-end text-center"
        >
          <dt className="text-h1 font-bold leading-none">
            <AnimatedMetric value={stat.value} active={playing} />
          </dt>
          <dd className="mt-2 max-w-[8rem] text-label font-bold leading-snug">
            {stat.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
