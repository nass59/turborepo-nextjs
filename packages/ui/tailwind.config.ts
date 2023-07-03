import type { Config } from "tailwindcss"

import sharedConfig from "../tailwind-config"
import { shadcnPreset } from "../tailwind-config/lib/shadcn-preset"

const config = {
  ...sharedConfig,
  content: ["./*.{ts,tsx}"],
  presets: [shadcnPreset],
} satisfies Config

export default config
