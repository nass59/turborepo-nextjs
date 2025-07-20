import type { Config } from "tailwindcss";

import { shadcnPreset } from "@workspace/tailwind-config/lib/shadcn-preset";

const config = {
  content: [
    "./src/stories/**/*.{ts,tsx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
  ],
  presets: [shadcnPreset],
} satisfies Config;

export default config;
