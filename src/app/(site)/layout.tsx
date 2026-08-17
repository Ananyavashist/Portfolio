import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <div
        id="SiteShell"
        data-ui="SiteShell"
        className="min-h-screen bg-canvas font-sans text-ink"
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}
