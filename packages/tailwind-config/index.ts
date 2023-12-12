import type { Config } from "tailwindcss"

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
  ],
} satisfies Config

export default config
