"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { HeroArtboard } from "@/components/cinematic/HeroArtboard";

function HeroLockInner() {
  const overlay = useSearchParams().get("overlay") === "1";

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.heroLock = "true";
    return () => {
      delete root.dataset.heroLock;
    };
  }, []);

  return (
    <main
      id="HeroLockPage"
      data-ui="HeroLockPage"
      style={{
        width: 1689,
        height: 931,
        overflow: "hidden",
        background: "#121212",
      }}
    >
      <HeroArtboard overlay={overlay} />
    </main>
  );
}

export default function HeroLockPage() {
  return (
    <Suspense>
      <HeroLockInner />
    </Suspense>
  );
}
