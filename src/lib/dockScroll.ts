export function resolveDockTarget(targetId: string) {
  if (targetId === "HeroTrack" || targetId === "StaticHero") {
    return (
      document.getElementById("HeroTrack") ??
      document.getElementById("StaticHero")
    );
  }
  return document.getElementById(targetId);
}

export function scrollToDockTarget(
  targetId: string,
  behavior: ScrollBehavior,
) {
  if (targetId === "HeroTrack" || targetId === "StaticHero") {
    window.scrollTo({ top: 0, behavior });
    return true;
  }

  const node = resolveDockTarget(targetId);
  if (!node) return false;
  node.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function waitForDockTarget(
  targetId: string,
  onFound: () => void,
) {
  let frames = 0;

  const tick = () => {
    if (targetId === "HeroTrack" || targetId === "StaticHero") {
      onFound();
      return;
    }
    if (resolveDockTarget(targetId)) {
      onFound();
      return;
    }
    frames += 1;
    if (frames < 90) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

export function dockScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}
