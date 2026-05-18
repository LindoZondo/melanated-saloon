import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FFF9E6",
          100: "#FFF0B3",
          200: "#FFE680",
          300: "#FFDB4D",
          400: "#FFD11A",
          500: "#D4A017",
          600: "#B8860B",
          700: "#8B6914",
          800: "#5E4B1E",
          900: "#3D2E0F",
        },
        melanin: {
          50: "#FDF5F0",
          100: "#F5E6DB",
          200: "#E8C9B0",
          300: "#D4A574",
          400: "#C08552",
          500: "#8B5E3C",
          600: "#6B4226",
          700: "#4A2C17",
          800: "#2D1810",
          900: "#1A0E09",
        },
        cream: {
          50: "#FFFDF7",
          100: "#FFF8E7",
          200: "#FFF0CC",
          300: "#FFE4A3",
          400: "#FFD97A",
        },
        deep: {
          800: "#1C1017",
          900: "#0F0A0D",
          950: "#080507",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        accent: ["Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        "gradient-luxury":
          "linear-gradient(135deg, #1A0E09 0%, #2D1810 50%, #4A2C17 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #D4A017 0%, #FFD11A 50%, #B8860B 100%)",
        "gradient-warm":
          "linear-gradient(180deg, #0F0A0D 0%, #1C1017 50%, #2D1810 100%)",
      },
      boxShadow: {
        gold: "0 4px 20px rgba(212, 160, 23, 0.3)",
        "gold-lg": "0 8px 40px rgba(212, 160, 23, 0.4)",
        luxury: "0 20px 60px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
