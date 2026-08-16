"use client";

import Image from "next/image";
import Link from "next/link";
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

function NavLink({
  id,
  href,
  label,
  active,
}: {
  id: string;
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      id={id}
      data-ui={id}
      href={href}
      className={`relative px-0.5 py-1 text-[0.8rem] tracking-[-0.01em] transition-colors duration-300 phone:px-1 phone:text-[var(--nav-size)] ${
        active ? "text-ink" : "text-muted hover:text-ink"
      }`}
    >
      {label}
      <span
        className={`absolute inset-x-1 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
        aria-hidden
      />
    </Link>
  );
}

function NavGroup({ pathname }: { pathname: string }) {
  return (
    <nav
      id="NavGroup"
      data-ui="NavGroup"
      className="flex items-center justify-end gap-3 phone:gap-7 md:gap-9"
      aria-label="Primary"
    >
      {site.nav.map((item) => {
        const path = pathname.endsWith("/") && pathname !== "/" ? pathname : `${pathname}/`;
        const href = item.href;
        const active =
          href === "/"
            ? pathname === "/" || pathname === ""
            : path.startsWith(href);
        return (
          <NavLink
            key={item.id}
            id={item.id}
            href={item.href}
            label={item.label}
            active={active}
          />
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header
      id="SiteHeader"
      data-ui="SiteHeader"
      className="mx-auto flex w-full max-w-page items-center justify-between px-[var(--page-pad)] pb-6 pt-5 md:pb-8 md:pt-7"
    >
      <SiteLogo />
      <NavGroup pathname={pathname} />
    </header>
  );
}
