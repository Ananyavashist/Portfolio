import Link from "next/link";
import { ExportSquare } from "iconsax-reactjs";
import { site } from "@/content/site";
import {
  footerLocation,
  footerNavigation,
  footerSocialLinks,
  footerStatement,
  type FooterDestination,
} from "@/content/footer";
import { FooterImageTicker } from "@/components/site/FooterImageTicker";

const headingClass =
  "mb-5 text-label font-medium uppercase tracking-[0.01em] text-white";

const itemClass =
  "block text-body font-medium text-white/92 transition-[opacity,transform] duration-200 ease-out hover:translate-x-[2px] hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#27328A]";

function FooterHeading({ children }: { children: string }) {
  return <p className={headingClass}>{children}</p>;
}

function FooterNavItem({ item }: { item: FooterDestination }) {
  if (!item.href) {
    return (
      <span id={item.id} data-ui={item.id} className="block text-body font-medium text-white/92">
        {item.label}
      </span>
    );
  }

  return (
    <Link id={item.id} data-ui={item.id} href={item.href} className={itemClass}>
      {item.label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <section
      id="FooterShell"
      data-ui="FooterShell"
      className="flex h-full min-h-[100svh] flex-col bg-black px-3 pb-3 pt-3 md:px-6 md:pb-6 md:pt-6"
    >
      <footer
        id="FooterContact"
        data-ui="FooterContact"
        aria-label="Portfolio footer"
        className="relative isolate flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px] bg-[#27328A] font-project text-white md:rounded-[24px]"
      >
        <div
          className="relative z-[2] grid min-h-0 flex-1 gap-x-10 gap-y-8 overflow-y-auto px-6 pb-10 pt-10 md:grid-cols-2 md:gap-y-12 md:px-10 md:pb-16 md:pt-20 xl:grid-cols-[2.4fr_1.45fr_0.9fr_0.9fr_1.15fr] xl:gap-x-14 xl:px-[clamp(72px,7vw,140px)] xl:pt-[clamp(88px,7vw,128px)]"
        >
          <p className="max-w-[540px] font-handwritten text-[length:var(--type-footer-statement)] font-normal leading-[1.17] tracking-[-0.02em] text-white md:col-span-2 xl:col-span-1">
            {footerStatement}
          </p>

          <div>
            <FooterHeading>CONTACT</FooterHeading>
            <div className="flex flex-col gap-3">
              <a
                id="FooterEmail"
                data-ui="FooterEmail"
                href={`mailto:${site.email}`}
                className={`${itemClass} font-semibold [overflow-wrap:anywhere]`}
              >
                {site.email}
              </a>
              <a
                id="FooterScheduleCall"
                data-ui="FooterScheduleCall"
                href={site.scheduleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${itemClass} inline-flex items-center gap-1.5`}
              >
                Schedule a call
                <ExportSquare size={16} color="currentColor" variant="Linear" aria-hidden />
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <FooterHeading>NAVIGATION</FooterHeading>
            <ul className="flex flex-col gap-3">
              {footerNavigation.map((item) => (
                <li key={item.id}>
                  <FooterNavItem item={item} />
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social links">
            <FooterHeading>SOCIAL</FooterHeading>
            <ul className="flex flex-col gap-3">
              {footerSocialLinks.map((item) => (
                <li key={item.id}>
                  {item.href ? (
                    <a
                      id={`FooterSocial-${item.id}`}
                      data-ui={`FooterSocial-${item.id}`}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={itemClass}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="block text-body font-medium text-white/92">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <FooterHeading>LOCATION</FooterHeading>
            <p className="text-body font-medium text-white/92">
              {footerLocation.place}
              <span className="block">{footerLocation.note}</span>
            </p>
          </div>
        </div>

        <div className="mt-auto shrink-0">
          <FooterImageTicker />
        </div>
      </footer>
    </section>
  );
}
