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
  const [display, setDisplay] = useState(reducedMotion ? amount : 0);

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
      className="mt-[60px] flex w-full flex-row flex-nowrap items-start justify-center gap-x-[120px]"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-end text-center"
        >
          <dt className="text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold leading-none">
            <AnimatedMetric value={stat.value} active={playing} />
          </dt>
          <dd className="mt-2 text-[clamp(0.875rem,1.5vw,1rem)] leading-snug">
            {stat.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
