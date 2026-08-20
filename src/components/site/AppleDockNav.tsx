"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Icon } from "iconsax-reactjs";
import {
  DocumentText,
  Home2,
  NoteText,
  PlayCircle,
  Profile,
  Sms,
} from "iconsax-reactjs";
import {
  DOCK_NAVIGATE_EVENT,
  DOCK_PENDING_TARGET_KEY,
  DOCK_REPLAY_EVENT,
  DOCK_REPLAY_INTRO_KEY,
  DOCK_SETTINGS,
  DOCK_VISIBILITY_EVENT,
  dockItems,
  type DockItemConfig,
  type DockItemId,
} from "@/content/dockNavigation";

const COARSE_POINTER = "(pointer: coarse), (hover: none)";

const DOCK_ICONS: Record<DockItemId, Icon> = {
  home: Home2,
  projects: DocumentText,
  about: Profile,
  play: PlayCircle,
  resume: NoteText,
  contact: Sms,
};

const MotionLink = motion.create(Link);

function isHomePath(pathname: string) {
  return pathname === "/" || pathname === "";
}

function normalizePath(pathname: string) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function activateDockItem(
  item: DockItemConfig,
  pathname: string,
  router: ReturnType<typeof useRouter>,
) {
  const action = item.action;

  if (action.type === "email") {
    window.location.href = `mailto:${action.address}`;
    return;
  }

  if (action.type === "route") {
    router.push(action.href);
    return;
  }

  if (action.type === "replay-intro") {
    if (isHomePath(pathname)) {
      window.dispatchEvent(new Event(DOCK_REPLAY_EVENT));
      return;
    }
    sessionStorage.setItem(DOCK_REPLAY_INTRO_KEY, "1");
    router.push("/");
    return;
  }

  if (isHomePath(pathname)) {
    window.dispatchEvent(
      new CustomEvent(DOCK_NAVIGATE_EVENT, {
        detail: { targetId: action.targetId },
      }),
    );
    return;
  }

  sessionStorage.setItem(DOCK_PENDING_TARGET_KEY, action.targetId);
  router.push("/");
}

function DockItem({
  item,
  mouseX,
  restSize,
  maxSize,
  magnify,
  reducedMotion,
  active,
  tooltip,
  onTooltip,
  onActivate,
}: {
  item: DockItemConfig;
  mouseX: MotionValue<number>;
  restSize: number;
  maxSize: number;
  magnify: boolean;
  reducedMotion: boolean;
  active: boolean;
  tooltip: boolean;
  onTooltip: (id: DockItemId | null) => void;
  onActivate: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (pointerX) => {
    const rect = itemRef.current?.getBoundingClientRect();

    if (!rect || !Number.isFinite(pointerX)) {
      return DOCK_SETTINGS.influenceDistance * 2;
    }

    const itemCenter = rect.left + rect.width / 2;
    return pointerX - itemCenter;
  });

  const targetSize = useTransform(
    distance,
    [
      -DOCK_SETTINGS.influenceDistance,
      0,
      DOCK_SETTINGS.influenceDistance,
    ],
    [restSize, maxSize, restSize],
    { clamp: true },
  );

  const sprungSize = useSpring(targetSize, DOCK_SETTINGS.spring);
  const animatedSize = magnify && !reducedMotion ? sprungSize : targetSize;

  const tap = reducedMotion ? { scale: 1, y: 0 } : { scale: 0.9, y: 2 };
  const controlClass =
    "relative flex h-full w-full items-center justify-center rounded-[18px] origin-bottom text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40";

  const showTip = () => onTooltip(item.id);
  const hideTip = () => onTooltip(null);

  const DockIcon = DOCK_ICONS[item.id];
  const icon = (
    <DockIcon
      variant="Linear"
      color="currentColor"
      aria-hidden="true"
      className="h-[58%] w-[58%]"
    />
  );

  const inner =
    item.action.type === "route" ? (
      <MotionLink
        id={`DockItem-${item.id}`}
        data-ui={`DockItem-${item.id}`}
        href={item.action.href}
        aria-label={item.label}
        aria-current={active ? "page" : undefined}
        className={controlClass}
        whileTap={tap}
        onFocus={showTip}
        onBlur={hideTip}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") showTip();
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") hideTip();
        }}
      >
        {icon}
      </MotionLink>
    ) : (
      <motion.button
        id={`DockItem-${item.id}`}
        data-ui={`DockItem-${item.id}`}
        type="button"
        aria-label={item.label}
        aria-current={active ? "page" : undefined}
        className={controlClass}
        whileTap={tap}
        onClick={onActivate}
        onFocus={showTip}
        onBlur={hideTip}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") showTip();
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") hideTip();
        }}
      >
        {icon}
      </motion.button>
    );

  return (
    <div ref={itemRef} className="relative flex flex-col items-center justify-end">
      <AnimatePresence>
        {tooltip ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-[10px] border border-white/20 bg-black/70 px-2.5 py-1 font-project text-label font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md"
            style={{ bottom: `calc(100% + ${DOCK_SETTINGS.tooltipOffset}px)` }}
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.96 }
            }
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.98 }
            }
            transition={{ duration: reducedMotion ? 0 : 0.14, ease: "easeOut" }}
          >
            {item.label}
          </motion.span>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="relative origin-bottom will-change-[width,height]"
        style={
          magnify
            ? { width: animatedSize, height: animatedSize }
            : { width: restSize, height: restSize }
        }
      >
        {inner}
      </motion.div>

      <span
        aria-hidden="true"
        className={`mt-1 h-1 w-1 rounded-full bg-white transition-opacity duration-150 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export function AppleDockNav() {
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const [mounted, setMounted] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const [section, setSection] = useState<DockItemId | null>(null);
  const [tooltipId, setTooltipId] = useState<DockItemId | null>(null);
  const reducedMotion = mounted && !!prefersReducedMotion;
  const onHome = isHomePath(pathname);
  const [heroReady, setHeroReady] = useState(!onHome);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!onHome) {
      setHeroReady(true);
      return;
    }

    setHeroReady(document.documentElement.dataset.dockReady === "true");

    const onVis = (event: Event) => {
      const visible = (event as CustomEvent<{ visible?: boolean }>).detail
        ?.visible;
      if (typeof visible === "boolean") setHeroReady(visible);
    };

    window.addEventListener(DOCK_VISIBILITY_EVENT, onVis);
    return () => window.removeEventListener(DOCK_VISIBILITY_EVENT, onVis);
  }, [onHome, pathname]);

  useEffect(() => {
    const footer =
      document.getElementById("FooterContact") ??
      document.getElementById("FooterShell") ??
      document.getElementById("FooterCard");

    if (!footer) {
      setFooterInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const reached =
          entry.isIntersecting &&
          entry.boundingClientRect.top < window.innerHeight * 0.78;
        setFooterInView(reached);
      },
      { threshold: [0, 0.08, 0.16, 0.28, 0.4, 0.55, 0.7] },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia(COARSE_POINTER);
    const update = () => setCoarse(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const reset = () => mouseX.set(Number.POSITIVE_INFINITY);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("blur", reset);
      reset();
    };
  }, [mouseX]);

  useEffect(() => {
    const path = normalizePath(pathname);

    if (path.startsWith("/about/")) {
      setSection("about");
      return;
    }
    if (path.startsWith("/resume/")) {
      setSection("resume");
      return;
    }
    if (path.startsWith("/case-studies/")) {
      setSection("projects");
      return;
    }
    if (!isHomePath(pathname)) {
      setSection(null);
      return;
    }

    const ratios = new Map<string, number>();
    const tops = new Map<string, number>();
    const ids = ["HeroTrack", "StaticHero", "ProjectsCard", "FooterContact"];

    const pick = () => {
      const hero = Math.max(
        ratios.get("HeroTrack") ?? 0,
        ratios.get("StaticHero") ?? 0,
      );
      const projects = ratios.get("ProjectsCard") ?? 0;
      const contactTop = tops.get("FooterContact") ?? Number.POSITIVE_INFINITY;
      const contactVisible =
        (ratios.get("FooterContact") ?? 0) > 0 &&
        contactTop < window.innerHeight * 0.7;

      if (contactVisible) {
        setSection("contact");
        return;
      }
      if (projects >= 0.28 && projects >= hero) {
        setSection("projects");
        return;
      }
      setSection("home");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
          tops.set(entry.target.id, entry.boundingClientRect.top);
        });
        pick();
      },
      { threshold: [0, 0.15, 0.28, 0.35, 0.5, 0.65, 0.85] },
    );

    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    pick();
    return () => observer.disconnect();
  }, [pathname]);

  const restSize = coarse
    ? DOCK_SETTINGS.mobileIconSize
    : DOCK_SETTINGS.desktopBaseIconSize;
  const maxSize = coarse
    ? DOCK_SETTINGS.mobileIconSize
    : DOCK_SETTINGS.desktopMaximumIconSize;
  const magnify = !coarse && !reducedMotion;

  const trayHeight = restSize + DOCK_SETTINGS.verticalPadding * 2;
  const rowHeight = maxSize + DOCK_SETTINGS.verticalPadding + 8;

  const resetPointer = useCallback(() => {
    mouseX.set(Number.POSITIVE_INFINITY);
    setTooltipId(null);
  }, [mouseX]);

  const fineTooltip = !coarse && tooltipId !== null;
  const dockShown = heroReady && !footerInView;

  if (pathname.startsWith("/hero-lock")) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 z-[10000] flex justify-center isolate px-3"
      style={{
        bottom: `max(${DOCK_SETTINGS.bottomOffset}px, env(safe-area-inset-bottom))`,
      }}
      initial={false}
      animate={
        dockShown
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 18 }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.35, ease: "easeOut" }
      }
    >
      <nav
        aria-label="Primary navigation"
        aria-hidden={!dockShown}
        inert={!dockShown ? true : undefined}
        className={`relative w-max max-w-[calc(100vw-24px)] overflow-visible ${
          dockShown ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onPointerMove={
          magnify
            ? (event) => {
                if (event.pointerType === "mouse") mouseX.set(event.clientX);
              }
            : undefined
        }
        onPointerLeave={resetPointer}
        onPointerCancel={resetPointer}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 rounded-[24px] border border-white/20 bg-black/45 shadow-[0_16px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl supports-[backdrop-filter]:bg-black/35"
          style={{ height: trayHeight }}
        />

        <div
          className="relative flex items-end"
          style={{
            height: rowHeight,
            gap: DOCK_SETTINGS.itemGap,
            paddingLeft: DOCK_SETTINGS.horizontalPadding,
            paddingRight: DOCK_SETTINGS.horizontalPadding,
            paddingBottom: DOCK_SETTINGS.verticalPadding,
          }}
        >
          {dockItems.map((item) => (
            <DockItem
              key={item.id}
              item={item}
              mouseX={mouseX}
              restSize={restSize}
              maxSize={maxSize}
              magnify={magnify}
              reducedMotion={reducedMotion || coarse}
              active={section === item.id}
              tooltip={fineTooltip && tooltipId === item.id}
              onTooltip={setTooltipId}
              onActivate={() => activateDockItem(item, pathname, router)}
            />
          ))}
        </div>
      </nav>
    </motion.div>
  );
}
