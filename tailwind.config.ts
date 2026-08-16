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
