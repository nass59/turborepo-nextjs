import type { Config } from "tailwindcss"
import sharedConfig  from "tailwindconfig"
import { shadcnPreset } from "tailwindconfig/lib/shadcn-preset"

const config = {
  ...sharedConfig,
  presets: [shadcnPreset],
} satisfies Config

export default config