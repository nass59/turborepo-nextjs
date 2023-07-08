module.exports = {
  $schema: "https://json.schemastore.org/eslintrc",
  extends: ["turbo", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "react/jsx-key": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
  },
  reportUnusedDisableDirectives: true,
}
