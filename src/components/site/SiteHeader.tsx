"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, LayoutGroup } from "motion/react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { asset } from "@/lib/asset";

function SiteLogo() {
  return (
    <Link
      id="SiteLogo"
      data-ui="SiteLogo"
      href="/"
      className="relative z-10 flex h-8 w-8 shrink-0 overflow-hidden rounded-full phone:h-9 phone:w-9"
      aria-label="Home"
    >
      <Image
        src={asset(site.logo.src)}
        alt={site.logo.alt}
        width={72}
        height={72}
        className="h-full w-full object-cover"
        priority
      />
    </Link>
  );
}

function isActivePath(pathname: string, href: string) {
  const path = pathname.endsWith("/") && pathname !== "/" ? pathname : `${pathname}/`;
  if (href === "/") {
    return pathname === "/" || pathname === "";
  }
  return path.startsWith(href);
}

function NavLink({
  id,
  href,
  label,
  active,
  highlighted,
  onEnter,
}: {
  id: string;
  href: string;
  label: string;
  active: boolean;
  highlighted: boolean;
  onEnter: () => void;
}) {
  return (
    <Link
      id={id}
      data-ui={id}
      href={href}
      onMouseEnter={onEnter}
      aria-current={active ? "page" : undefined}
      className={`relative z-10 px-3 py-2 text-[0.75rem] tracking-[-0.01em] transition-colors duration-300 phone:px-3.5 phone:text-[0.8rem] ${
        highlighted ? "text-[#04111f]" : "text-[#5b5f63]"
      }`}
    >
      {highlighted ? (
        <motion.span
          id="NavHoverFill"
          data-ui="NavHoverFill"
          layoutId="NavHoverFill"
          className="absolute inset-0 -z-10 rounded-[16px] bg-[#FAFAFA] backdrop-blur-[10px]"
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
        />
      ) : null}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

function NavGroup({ pathname }: { pathname: string }) {
  const activeId = site.nav.find((item) => isActivePath(pathname, item.href))?.id ?? site.nav[0].id;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const highlightedId = hoveredId ?? activeId;

  return (
    <LayoutGroup>
    <nav
      id="NavGroup"
      data-ui="NavGroup"
      className="flex items-center rounded-[20px] bg-white/20 p-1 backdrop-blur-[10px]"
      aria-label="Primary"
      onMouseLeave={() => setHoveredId(null)}
    >
      {site.nav.map((item) => (
        <NavLink
          key={item.id}
          id={item.id}
          href={item.href}
          label={item.label}
          active={item.id === activeId}
          highlighted={item.id === highlightedId}
          onEnter={() => setHoveredId(item.id)}
        />
      ))}
    </nav>
    </LayoutGroup>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header
      id="SiteHeader"
      data-ui="SiteHeader"
      className="relative z-30 mx-auto flex w-full max-w-page items-center justify-between px-[var(--page-pad)] pb-6 pt-5 md:pb-8 md:pt-7"
    >
      <SiteLogo />
      <NavGroup pathname={pathname} />
    </header>
  );
}
