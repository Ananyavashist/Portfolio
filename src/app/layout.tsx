import type { Metadata } from "next";
import { Inter, Pangolin, Plus_Jakarta_Sans } from "next/font/google";
import { SiteCursor } from "@/components/core/SiteCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-inter-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const pangolin = Pangolin({
  subsets: ["latin"],
  variable: "--font-pangolin",
  display: "swap",
  weight: "400",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ananya — Product Designer",
  description:
    "Product designer working across enterprise SaaS and consumer products, currently experimenting with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interDisplay.variable} ${pangolin.variable} ${plusJakarta.variable} antialiased`}
      >
        {children}
        <SiteCursor />
      </body>
    </html>
  );
}
