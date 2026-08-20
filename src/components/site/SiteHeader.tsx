"use client";

import Image from "next/image";
import Link from "next/link";
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

export function SiteHeader() {
  return (
    <header
      id="SiteHeader"
      data-ui="SiteHeader"
      className="relative z-30 mx-auto flex w-full max-w-page items-center px-[var(--page-pad)] pb-0 pt-5 md:pt-7"
    >
      <SiteLogo />
    </header>
  );
}
