import type { Metadata } from "next";
import { Balsamiq_Sans, Indie_Flower, Inter } from "next/font/google";
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

const indieFlower = Indie_Flower({
  subsets: ["latin"],
  variable: "--font-indie-flower",
  display: "swap",
  weight: "400",
});

const balsamiqSans = Balsamiq_Sans({
  subsets: ["latin"],
  variable: "--font-balsamiq",
  display: "swap",
  weight: ["400", "700"],
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
        className={`${inter.variable} ${interDisplay.variable} ${indieFlower.variable} ${balsamiqSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
