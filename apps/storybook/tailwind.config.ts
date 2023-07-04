import sharedConfig from "@shared/tailwind-config"
import { shadcnPreset } from "@shared/tailwind-config/lib/shadcn-preset"
import type { Config } from "tailwindcss"

const config = {
  ...sharedConfig,
  presets: [shadcnPreset],
} satisfies Config

export default config
