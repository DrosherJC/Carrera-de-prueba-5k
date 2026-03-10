import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          orange: "#FF4D00",
          dark: "#0A0A0A",
          mid: "#141414",
          card: "#1C1C1C",
          border: "#2A2A2A",
          muted: "#6B6B6B",
          light: "#F0EDE8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
