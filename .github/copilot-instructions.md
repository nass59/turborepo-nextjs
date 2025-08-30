You are an expert AI pair‑programmer for this Turborepo (Next.js 15 + React 19 + Tailwind 4). Prefer precision, project conventions, and minimal diff changes.

## 1. Architecture & Boundaries
Apps: `apps/web` (App Router) & `apps/storybook` (component docs). Shared UI & utilities live in `packages/design-system` (exports via path sub-entries) and TS configs in `packages/typescript-config`. Feature code in `apps/web` is grouped by route segment (e.g. `app/(public)/(home)`) and domain modules under `modules/` & `features/`—keep business logic out of leaf pages. Auth enforced centrally via `apps/web/middleware.ts` (Clerk route guard) – don't duplicate per-route auth.

## 2. Data, Env, Auth
Env schema validated in `apps/web/env.mjs` with `@t3-oss/env-nextjs` + zod; always import from `@/env` (or relative) instead of `process.env`. Planned persistence: MongoDB + Mongoose (see ADR 0005). Authentication: Clerk (ADR 0006) + GitHub OAuth keys; use server helpers from `@clerk/nextjs/server` inside Server Components / route handlers, and client hooks only in `'use client'` components that need session state.

## 3. Rendering Patterns
Default to Server Components. Add `'use client'` only for interactivity (forms, animations, theme toggles, Zustand stores). Co-locate interactive child component instead of promoting page to client. Example: `app/(public)/(home)/page.tsx` stays server; interactive buttons come from `modules/home/ui/*` (client if needed). MDX pipeline configured in `next.config.ts` + custom mapping in `mdx-components.tsx`—extend there, not ad hoc in pages.

## 4. Styling & Design System
Import primitives from `@workspace/design-system/components/ui/*`, utilities from `@workspace/design-system/lib/utils` (`cn`). Prefer existing tokens/utilities; add new variants via class-variance-authority patterns used in DS components. Tailwind class order must satisfy Biome sorting; run `pnpm format` first. If manual, order: custom utilities → layout/sizing/spacing → visual (bg/text/border/shadow) → state variants → responsive breakpoints.

## 5. Type & Code Conventions
Strict TS: use `type` aliases, unions, const assertions; avoid `any` & `enum`. Narrow unknown with type guards. Export named symbols; no default exports in shared packages (exceptions: Next.js page/layout components). Keep files lean: component first, then local helpers, types at bottom or separate `types.ts` when reused.

## 6. Performance Choices
Leverage RSC data fetching; avoid client data fetching unless necessary. Use `next/image` for remote hosts (see `next.config.ts images.remotePatterns`). Apply dynamic `import()` only for heavy, client-only pieces (charts, animations). Avoid premature `React.memo`; prefer deriving lightweight props upstream.

## 7. Build & Tasks
Key commands: `pnpm dev` (all), `pnpm --filter=web dev`, `pnpm --filter=storybook dev`, `pnpm typecheck`, `pnpm lint`, `pnpm format`, `pnpm build`. Turbo config (`turbo.json`) declares environment passthrough—add new required env vars there when build-time required. Use `debug:next` / `debug:storybook` scripts for inspector debugging.

## 8. Adding / Updating UI
Add or sync DS components via `pnpm bump-ui` (shadcn bulk add into design-system). Stories live in `apps/storybook/stories/*`; mirror component folder names for discoverability. When extending design-system, expose new entry through `package.json` exports pattern before consumption.

## 9. Error & Loading Strategy
Follow ADR 0007: central error boundaries + future Sentry integration. For route segment errors, add `error.tsx` and `loading.tsx` beside `page.tsx`. Surface user-safe messages; log details server-side (`console.error`). Avoid duplicating generic catch blocks—centralize transformation utilities in a future `lib/errors.ts`.

## 10. Commit & Documentation
Commit messages: conventional commits (see `commitlint.config.js`). Significant structural / tech decisions require an ADR in `docs/adr/` (copy `template.md`). For new public utilities/components: add JSDoc and (if non-trivial) a Storybook story.

## 11. Common Pitfalls
Do NOT import DS internal file paths not exported in `package.json` (breaks future refactors). Do NOT access `process.env` directly in components—use validated `env`. Keep route groups `(public)` / `(admin)` semantics: put shared layout logic in parent segment. Avoid marking entire page client for a single button. Ensure new env vars added to both schema and `turbo.json` build `env` array if needed at build.

## 12. Quick Example (Home Section)
`page.tsx` (server) imports UI building blocks: animated pattern (`AnimatedGridPattern`), structural `Block`/`Heading` from module UI; heavy visual effect isolated and can stay server since it's pure. Pattern: page orchestrates layout; module folder owns presentation + client logic.

## 13. Fast Checklist Before PR
1. `pnpm typecheck && pnpm lint` clean
2. Tailwind classes sorted (Biome passes)
3. No unintended client component promotion
4. Exports surfaced correctly for shared code
5. Updated ADR/docs if architecture affected

Feedback welcome: if any section is unclear or a recurring pattern isn't captured, point it out so we can refine this guide.
