module.exports = {
  $schema: "https://json.schemastore.org/eslintrc",
  extends: ["next/core-web-vitals", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
  settings: {
    next: {
      rootDir: true,
    },
  },
}
