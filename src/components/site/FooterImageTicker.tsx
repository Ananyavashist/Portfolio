import {
  footerTickerImages,
  type FooterTickerHeight,
  type FooterTickerImage,
} from "@/content/footer";
import { asset } from "@/lib/asset";

const HEIGHT_CLASS: Record<FooterTickerHeight, string> = {
  tall: "h-[var(--footer-ticker-height-tall)]",
  medium: "h-[var(--footer-ticker-height-medium)]",
  short: "h-[var(--footer-ticker-height-short)]",
};

function TickerCard({
  image,
  decorative,
}: {
  image: FooterTickerImage;
  decorative: boolean;
}) {
  return (
    <div
      className={`relative w-[var(--footer-ticker-card-width)] shrink-0 overflow-hidden rounded-[18px] bg-[#D9D9D9] ${HEIGHT_CLASS[image.height]}`}
    >
      {image.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(image.src)}
          alt={decorative ? "" : image.alt}
          className="h-full w-full object-cover"
          style={{ objectPosition: image.objectPosition ?? "center" }}
          loading="lazy"
          draggable={false}
        />
      ) : null}
    </div>
  );
}

function TickerGroup({
  decorative,
}: {
  decorative: boolean;
}) {
  return (
    <div className="flex shrink-0 items-end gap-1.5 pr-1.5">
      {footerTickerImages.map((image) => (
        <TickerCard
          key={`${decorative ? "dup" : "src"}-${image.id}`}
          image={image}
          decorative={decorative}
        />
      ))}
    </div>
  );
}

export function FooterImageTicker() {
  return (
    <div
      id="FooterImageTicker"
      data-ui="FooterImageTicker"
      aria-hidden
      className="footer-ticker-viewport pointer-events-none relative z-[1] overflow-hidden"
    >
      <div className="footer-ticker-offset">
        <div className="footer-ticker-track">
          <TickerGroup decorative={false} />
          <TickerGroup decorative />
        </div>
      </div>
    </div>
  );
}
