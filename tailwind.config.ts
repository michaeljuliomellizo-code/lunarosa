import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E8A0B1",
        secondary: "#F8D7DA",
        accent: "#D97B93",
        dark: "#2A2A2A",
        light: "#FFF9FA",
      },
    },
  },
  plugins: [],
};

export default config;