import { defineConfig } from "vite-plus";

const ignorePatterns = [
	"**/.next/**",
	"**/dist/**",
	"**/.turbo/**",
	"**/.vscode/**",
	"**/.source/**",
	"**/storybook-static/**",
	"packages/design-system/src/components/magicui/**",
	"packages/design-system/src/components/ui/**",
	"packages/design-system/src/hooks/**",
	"packages/design-system/src/lib/**",
	"**/generated/prisma/**",
	"pnpm-lock.yaml",
	"**/*.md",
];

export default defineConfig({
	lint: { ignorePatterns },
	fmt: { ignorePatterns, useTabs: true },
});
