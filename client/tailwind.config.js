/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light mode
        background: "#F0F3F7",
        navbar: "#E5EAF2",
        card: "#E5EAF2",
        primaryText: "#1D1D1F",
        secondaryText: "#4B5563",
        mutedText: "#9CA3AF",
        primaryButton: "#18181b",
        secondaryButton: "#E5E5EA",

        // Dark mode
        darkBackground: "#1C1C1E",
        darkCard: "#2C2C2E",
        darkPrimaryText: "#F5F5F7",
        darkSecondaryText: "#A1A1A3",
        darkMutedText: "#636366",
        darkPrimaryButton: "#0A84FF",
        darkSecondaryButton: "#3A3A3C",

        // Toast colors
        toastSuccess: "#30D158",
        toastError: "#FF453A",
      },
      keyframes: {
        scaleIn: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        scaleIn: "scaleIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
