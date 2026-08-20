"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const ACTIVE_CLASS = "site-cursor-active";

const DEFAULT_FILL = "#000000";
const CARD_FILL = "#2F368F";

// The drawn tip sits at 2.549,2.935 in viewBox units and the 2px stroke reaches
// a unit past it, so the first visible pixel is here. The icon is shifted back
// by this much, which puts the tip on the wrapper's origin — and that origin is
// also the scale pivot, so growing the cursor never drags the tip off the
// real pointer position.
const TIP_X = 1.5;
const TIP_Y = 2;

const follow = { stiffness: 320, damping: 30, mass: 0.35 };

type Variant = "default" | "interactive" | "card";

function resolveVariant(
  target: EventTarget | null,
): { variant: Variant; label?: string } {
  if (!(target instanceof Element)) return { variant: "default" };

  // Cards are checked first: each card image lives inside its link, so the
  // interactive test below would otherwise swallow it.
  const card = target.closest<HTMLElement>("[data-cursor='card']");
  if (card) {
    return { variant: "card", label: card.dataset.cursorLabel ?? "View project" };
  }

  if (target.closest("a, button, [role='button']")) {
    return { variant: "interactive" };
  }

  return { variant: "default" };
}

export function SiteCursor() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, follow);
  const springY = useSpring(rawY, follow);
  const x = reducedMotion ? rawX : springX;
  const y = reducedMotion ? rawY : springY;

  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("View project");
  const seenPointer = useRef(false);

  // The native cursor is only hidden while ours is on screen, so the page is
  // never left with no cursor at all — including when JS never runs.
  const hide = useCallback(() => {
    seenPointer.current = false;
    document.documentElement.classList.remove(ACTIVE_CLASS);
    setVisible(false);
  }, []);

  useEffect(() => {
    const query = window.matchMedia(FINE_POINTER);

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      if (!seenPointer.current) {
        seenPointer.current = true;
        // Land on the pointer rather than springing in from the last position.
        springX.jump(event.clientX);
        springY.jump(event.clientY);
        document.documentElement.classList.add(ACTIVE_CLASS);
        setVisible(true);
      }

      rawX.set(event.clientX);
      rawY.set(event.clientY);

      const next = resolveVariant(event.target);
      setVariant(next.variant);
      if (next.label) setLabel(next.label);
    };

    // relatedTarget is null only when the pointer left the window entirely.
    const onLeave = (event: PointerEvent) => {
      if (event.relatedTarget === null) hide();
    };

    const attach = () => {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", hide);
    };

    const detach = () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", hide);
      hide();
    };

    // Coarse pointers never get listeners at all.
    if (query.matches) attach();

    const onQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) attach();
      else detach();
    };

    query.addEventListener("change", onQueryChange);
    return () => {
      query.removeEventListener("change", onQueryChange);
      detach();
    };
  }, [hide, rawX, rawY, springX, springY]);

  const isCard = variant === "card";
  const scale =
    visible && variant === "interactive" && !reducedMotion ? 1.35 : 1;

  if (pathname.startsWith("/hero-lock")) return null;

  return (
    <motion.div
      id="SiteCursor"
      data-ui="SiteCursor"
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[10001] hidden [@media(hover:hover)_and_(pointer:fine)]:block"
      style={{ x, y, transformOrigin: "0px 0px" }}
      animate={{ opacity: visible ? 1 : 0, scale }}
      transition={{ duration: reducedMotion ? 0 : 0.18, ease: "easeOut" }}
      initial={false}
    >
      <div style={{ marginLeft: -TIP_X, marginTop: -TIP_Y }}>
        <svg width={26} height={31} viewBox="0 0 26 31" fill="none">
          <motion.path
            d="M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z"
            fillRule="evenodd"
            clipRule="evenodd"
            stroke="#ffffff"
            strokeLinecap="square"
            strokeLinejoin="round"
            strokeWidth={2}
            initial={false}
            animate={{ fill: isCard ? CARD_FILL : DEFAULT_FILL }}
            transition={{ duration: reducedMotion ? 0 : 0.18, ease: "easeOut" }}
          />
        </svg>

        <AnimatePresence>
          {isCard ? (
            <motion.div
              // The cursor is mounted on <body>, which sets no font-family, so
              // the chip has to name the projects section's face itself rather
              // than inherit it from the card it is labelling.
              className="ml-4 mt-1 w-fit whitespace-nowrap rounded-[6px] bg-[#2F368F] px-3 py-1.5 font-project text-label font-medium text-white shadow-sm"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: reducedMotion ? 0 : 0.15, ease: "easeOut" }}
              style={{ originX: 0, originY: 0 }}
            >
              {label}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
