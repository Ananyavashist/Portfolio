import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xs: "320px",
      phone: "390px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      wide: "1440px",
    },
    extend: {
      colors: {
        canvas: "#ffffff",
        ink: "#5c5c5c",
        muted: "#9a9a9a",
        faint: "#b8b8b8",
        pill: "#2f2f2f",
        line: "#d8d8d8",
      },
      fontFamily: {
        display: ["var(--font-inter-display)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        h1: ["var(--type-h1)", { lineHeight: "1.15", letterSpacing: "-0.03em" }],
        h2: ["var(--type-h2)", { lineHeight: "1.2", letterSpacing: "-0.025em" }],
        h3: ["var(--type-h3)", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        h4: ["var(--type-h4)", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        h5: ["var(--type-h5)", { lineHeight: "1.35", letterSpacing: "-0.015em" }],
        body: ["var(--type-body)", { lineHeight: "1.6" }],
        label: ["var(--type-label)", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        page: "1440px",
      },
      borderRadius: {
        media: "18px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
