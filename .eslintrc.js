module.exports = {
  root: true,
  extends: ["@shared/eslint-config"],
  parser: "@typescript-eslint/parser",
  settings: {
    next: {
      rootDir: ["apps/web"],
    },
  },
}
