module.exports = {
  $schema: "https://json.schemastore.org/eslintrc",
  extends: ["turbo", "plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    "react/jsx-key": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
  },
  reportUnusedDisableDirectives: true,
}
