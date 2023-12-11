import { shadcnPreset } from "@shared/tailwind-config/lib/shadcn-preset"
import type { Config } from "tailwindcss"

const config = {
  content: [
    "./src/stories/**/*.{ts,tsx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
  ],
  presets: [shadcnPreset],
} satisfies Config

export default config
