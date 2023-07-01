import sharedConfig from "tailwindconfig"
import { shadcnPreset } from "tailwindconfig/lib/shadcn-preset"
import type { Config } from "tailwindcss"

const config = {
  ...sharedConfig,
  content: ["./*.{ts,tsx}"],
  presets: [shadcnPreset],
} satisfies Config

export default config
