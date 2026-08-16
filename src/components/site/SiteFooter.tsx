"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";

function FooterBrand() {
  return (
    <div id="FooterBrand" data-ui="FooterBrand" className="max-w-md">
      <h3
        id="FooterName"
        data-ui="FooterName"
        className="font-display text-h3 font-semibold text-ink"
      >
        {site.name}
      </h3>
      <p
        id="FooterBio"
        data-ui="FooterBio"
        className="mt-3 max-w-sm text-body text-muted"
      >
        {site.description}
      </p>
      <p
        id="FooterCopyright"
        data-ui="FooterCopyright"
        className="mt-8 text-label text-faint"
      >
        {site.copyright}
      </p>
    </div>
  );
}

function FooterLinks() {
  return (
    <div id="FooterLinks" data-ui="FooterLinks">
      <p className="mb-4 text-label text-faint">Links</p>
      <ul className="flex flex-col gap-2.5">
        {site.footerLinks.map((item) => (
          <li key={item.id}>
            <Link
              id={item.id}
              data-ui={item.id}
              href={item.href}
              className="text-body text-ink transition-colors duration-300 hover:text-muted"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      id="FooterEmail"
      data-ui="FooterEmail"
      type="button"
      onClick={onCopy}
      className="text-left text-body text-ink transition-colors duration-300 hover:text-muted"
      aria-label="Button for copy email"
    >
      <span>{site.email}</span>
      <span
        id="FooterEmailCopiedState"
        data-ui="FooterEmailCopiedState"
        className={`ml-2 text-label text-faint transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied!
      </span>
    </button>
  );
}

function FooterContact() {
  return (
    <div id="FooterContact" data-ui="FooterContact">
      <p className="mb-4 text-label text-faint">Contact</p>
      <div className="flex flex-col gap-2.5">
        <CopyEmailButton />
        <a
          id="FooterScheduleCall"
          data-ui="FooterScheduleCall"
          href={site.scheduleUrl}
          target="_blank"
          rel="noreferrer"
          className="text-body text-ink transition-colors duration-300 hover:text-muted"
        >
          Schedule a call
        </a>
      </div>
    </div>
  );
}

function FooterSocial() {
  return (
    <div id="FooterSocial" data-ui="FooterSocial" className="flex items-center gap-3">
      {site.social.map((item) => (
        <a
          key={item.id}
          id={item.id}
          data-ui={item.id}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:bg-neutral-50"
        >
          {item.label === "LinkedIn" ? <LinkedInIcon /> : <InstagramIcon />}
        </a>
      ))}
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.05c.53-1 1.84-2.1 3.79-2.1 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.06V24h-4V8.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer
      id="SiteFooter"
      data-ui="SiteFooter"
      className="mx-auto mt-[var(--section-gap)] w-full max-w-page border-t border-line/70 px-[var(--page-pad)] pb-12 pt-12 md:pb-16 md:pt-16"
    >
      <div className="grid grid-cols-1 gap-10 phone:gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <FooterBrand />
        </div>
        <div className="md:col-span-3">
          <FooterLinks />
        </div>
        <div className="flex flex-col justify-between gap-8 md:col-span-4 md:items-start">
          <FooterContact />
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}
