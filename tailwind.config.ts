import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dashboard: {
          bg:     "#0f172a",
          card:   "#1e293b",
          text:   "#f1f5f9",
          accent: "#6366f1",
          muted:  "#94a3b8",
          border: "#334155",
        },
      },
    },
  },
  plugins: [],
};
export default config;
