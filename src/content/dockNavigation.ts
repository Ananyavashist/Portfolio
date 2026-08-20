import { site } from "@/content/site";

export const DOCK_SETTINGS = {
  // The only size knobs to change when final icon measurements arrive.
  desktopBaseIconSize: 56,
  desktopMaximumIconSize: 88,
  mobileIconSize: 44,

  influenceDistance: 130,
  itemGap: 8,
  horizontalPadding: 10,
  verticalPadding: 8,
  bottomOffset: 18,
  tooltipOffset: 12,
  spring: {
    mass: 0.12,
    stiffness: 190,
    damping: 18,
  },
} as const;

export const DOCK_PENDING_TARGET_KEY = "portfolio:pending-dock-target";
export const DOCK_REPLAY_INTRO_KEY = "portfolio:replay-intro";
export const DOCK_REPLAY_EVENT = "portfolio:replay-intro";
export const DOCK_NAVIGATE_EVENT = "portfolio:dock-navigate";
export const DOCK_VISIBILITY_EVENT = "portfolio:dock-visibility";

export function setDockVisible(visible: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.dockReady = visible ? "true" : "false";
  window.dispatchEvent(
    new CustomEvent(DOCK_VISIBILITY_EVENT, { detail: { visible } }),
  );
}

export type DockItemId =
  | "home"
  | "projects"
  | "about"
  | "play"
  | "resume"
  | "contact";

export type DockItemAction =
  | { type: "route"; href: string }
  | { type: "home-section"; targetId: string }
  | { type: "replay-intro" }
  | { type: "email"; address: string };

export type DockItemConfig = {
  id: DockItemId;
  label: string;
  action: DockItemAction;
};

export const dockItems: DockItemConfig[] = [
  {
    id: "home",
    label: "Home",
    action: {
      type: "home-section",
      targetId: "HeroTrack",
    },
  },
  {
    id: "projects",
    label: "Projects",
    action: {
      type: "home-section",
      targetId: "ProjectsCard",
    },
  },
  {
    id: "about",
    label: "About",
    action: {
      type: "route",
      href: "/about/",
    },
  },
  {
    id: "play",
    label: "Play",
    action: {
      type: "replay-intro",
    },
  },
  {
    id: "resume",
    label: "Resume",
    action: {
      type: "route",
      href: "/resume/",
    },
  },
  {
    id: "contact",
    label: "Contact",
    action: {
      type: "email",
      address: site.email,
    },
  },
];
