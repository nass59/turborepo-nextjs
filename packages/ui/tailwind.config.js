/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../../packages/ui/components/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
