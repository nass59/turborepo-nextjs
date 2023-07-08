module.exports = {
  root: true,
  extends: [
    "@shared/eslint-config",
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
  ],
  plugins: ["tailwindcss"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off",
    "no-var": "off",
  },
  settings: {
    tailwindcss: {
      callees: ["cn", "cva"],
      config: "tailwind.config.ts",
    },
    next: {
      rootDir: true,
    },
  },
}
