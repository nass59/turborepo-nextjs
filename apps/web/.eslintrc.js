module.exports = {
  root: true,
  extends: [
    "custom",
    // "plugin:storybook/recommended",
    "plugin:tailwindcss/recommended",
  ],
  plugins: ["tailwindcss"],
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off",
  },
  settings: {
    tailwindcss: {
      callees: ["cn", "cva"],
    },
  },
}
