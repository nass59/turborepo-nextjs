You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI and Tailwind.

## 🎯 Project Context

This is a modern Next.js 15 Turborepo monorepo with:
- **Apps**: web (Next.js app), storybook (component documentation)
- **Packages**: design-system (shared UI components), typescript-config (shared TS configs)
- **Architecture**: Strict TypeScript, React Server Components, Tailwind CSS 4
- **Tools**: Biome (linting/formatting), Turbo (build system), pnpm (package manager)

## 📝 Code Style and Structure

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.

## 🏗️ Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.
- Use PascalCase for components, camelCase for functions and variables.
- Use UPPER_SNAKE_CASE for constants.

## 🔧 TypeScript Usage

- Use TypeScript for all code; prefer types over interfaces.
- Avoid enums; use union types or const assertions instead.
- Use functional components with TypeScript types.
- Implement strict null checks and prefer unknown over any.
- Use type guards for runtime type checking.
- Add JSDoc comments for all public functions and components.

## ⚛️ React Best Practices

- Use React Server Components by default for server-side logic.
- Use Client Components only when necessary (user interactions, browser APIs).
- Prefer composition over prop drilling.
- Use React 19 features: use(), startTransition(), useOptimistic().
- Implement proper error boundaries and loading states.

## 🎨 UI Development

- Use the design system from `@workspace/design-system`.
- Follow Tailwind CSS 4 conventions with design tokens.
- Implement responsive design with mobile-first approach.
- Use Radix UI primitives for accessible components.
- Prefer compound components for complex UI patterns.

## 📊 Performance & Optimization

- Use dynamic imports for code splitting.
- Implement proper image optimization with Next.js Image.
- Use React.memo() sparingly and only for expensive components.
- Prefer server-side data fetching when possible.
- Implement proper caching strategies.

## 🧪 Testing Approach

- Write tests for business logic and critical user flows.
- Use React Testing Library for component tests.
- Implement integration tests for API routes.
- Mock external dependencies appropriately.

## 📖 Documentation Standards

- Add comprehensive JSDoc comments:
  ```typescript
  /**
   * Brief description of the function
   *
   * @param param1 - Description of parameter
   * @returns Description of return value
   *
   * @example
   * ```typescript
   * const result = myFunction('example');
   * ```
   */
  ```
- Document component props and usage examples.
- Create ADRs for architectural decisions.
- Update documentation when making changes.

## 🔍 Debugging Guidelines

- Use TypeScript strict mode to catch errors early.
- Implement proper error handling with try/catch.
- Use console.error() for error logging, console.warn() for warnings.
- Leverage React DevTools and Next.js debugging features.
- Use the debug configurations in `.vscode/launch.json`.

## 🚀 AI-Optimized Patterns

- Write self-documenting code with clear intent.
- Use consistent patterns across the codebase.
- Implement proper separation of concerns.
- Create reusable utilities and hooks.
- Follow the established project architecture.

## 🛠️ Monorepo Considerations

- Use workspace protocol for internal dependencies.
- Share common configurations through packages.
- Maintain consistent tooling across all apps.
- Use Turborepo for efficient builds and caching.

## 📁 File Organization

```
app/
├── (public)/          # Public routes
├── (admin)/           # Admin routes
├── api/               # API routes
└── globals.css        # Global styles

components/
├── ui/                # Basic UI components
├── forms/             # Form components
└── layout/            # Layout components

lib/
├── utils.ts           # Utility functions
├── constants.ts       # App constants
└── types.ts           # Type definitions
```

## 🎯 When Making Changes

1. Run type checking: `pnpm typecheck`
2. Run linting: `pnpm lint`
3. Test locally: `pnpm dev`
4. Update documentation if needed
5. Consider creating ADR for significant changes

Remember: This project prioritizes type safety, developer experience, and AI-assisted development. Always consider the maintainability and clarity of your code.

## 🧹 Biome Class Sorting (Tailwind)

If you see the lint error:

> These CSS classes should be sorted (biomelint/nursery/useSortedClasses)

Quick fix workflow:
1. Run auto-format: `pnpm format` (this applies Biome's class reordering where safe).
2. If still failing, manually reorder the `className` tokens deterministically:
  - Custom utility (e.g. `focus-outline`) first
  - Layout & box model (flex / grid / sizing / spacing / border)
  - Visual (background, shadow, ring, text, effects)
  - State variants (`hover:`, `focus:` / `focus-visible:` / `group-hover:`)
  - Responsive (`sm:` → `md:` → `lg:` → `xl:`)
3. Re-run lint: `pnpm lint`.
4. Only if Biome repeatedly churns an already intentional grouping, keep Biome order and add a brief comment if the order has semantic meaning (rare).

Avoid disabling the rule; consistency improves diff quality and reduces merge noise.

Tip: Prefer promoting frequently repeated focus styles to a shared utility (like `.focus-outline`) to minimize reordering churn.
