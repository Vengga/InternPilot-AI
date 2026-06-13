import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — resolved from CSS variables so they flip with the theme.
        ink: "rgb(var(--ink) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        hud: "rgb(var(--hud) / <alpha-value>)",      // HUD cyan
        amber: "rgb(var(--amber) / <alpha-value>)",  // instrument amber
        ok: "rgb(var(--ok) / <alpha-value>)",
        warn: "rgb(var(--warn) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        sweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        blip: {
          "0%,100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        sweep: "sweep 6s linear infinite",
        blip: "blip 2.4s ease-in-out infinite",
        rise: "rise 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
