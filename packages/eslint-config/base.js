import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

export const config = [
  // Ignores configurations
  {
    name: "techship/library/ignores",
    ignores: [
      "dist/**",
      ".turbo/**",
      "storybook-static/**",
      "node_modules/**",
      "dist/**",
    ],
  },

  // JavaScript configurations
  {
    name: "techship/library/js",
    ...js.configs.recommended,
  },

  // TypeScript configurations
  ...tseslint.configs.recommended,
  {
    name: "techship/library/ts",
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": ["warn", { "ts-ignore": false }],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-shadow": "warn",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "_$",
          caughtErrorsIgnorePattern: "_$",
          varsIgnorePattern: "(_)$",
        },
      ],
    },
  },

  // General configurations
  {
    name: "techship/library/generic",
    rules: {
      "block-scoped-var": "warn",
      "default-case": "warn",
      "default-param-last": "warn",
      eqeqeq: "warn",
      "func-style": ["warn", "declaration", { allowArrowFunctions: true }],
      "guard-for-in": "warn",
      "max-depth": "warn",
      "max-params": ["warn", 5],
      "no-else-return": ["warn", { allowElseIf: false }],
      "no-eval": "warn",
      "no-implicit-globals": "warn",
      "no-implied-eval": "warn",
      "no-invalid-this": "warn",
      "no-script-url": "warn",
      "no-undef": "off",
      "no-useless-rename": "warn",
      "no-var": "warn",
      "object-shorthand": "warn",
      "prefer-const": "warn",
    },
  },

  // Turbo configurations
  {
    name: "techship/library/turbo",
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },

  // Prettier configuration (must be last)
  {
    name: "techship/prettier",
    ...eslintConfigPrettier,
  },
];
