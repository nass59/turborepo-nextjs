# Next.js 15 - AI Turborepo Starter

> **A production-ready monorepo showcasing modern web development with Next.js 15, React 19, and a thoughtfully-architected feature module system.**

## 🌐 Live Demo

**[turborepo-nextjs.vercel.app](https://turborepo-nextjs.vercel.app/)**

---

## 🎯 What Makes This Special?

### **Architecture First**
Clear separation between presentation, business logic, and data. Feature modules follow a strict **no-barrel-files** convention to prevent bundle bloat and maintain clear server/client boundaries in React Server Components.

### **Type Safety Everywhere**
End-to-end type safety with tRPC—from database queries to API responses to client components. If it compiles, it works.

### **Production Ready**
Includes authentication (Clerk), background jobs (Inngest), database (PostgreSQL + Prisma on NeonDB), AI integration (OpenAI + E2B sandboxes), and comprehensive error handling.

---

## 🛠️ Tech Stack

### **Core Framework**
- **[Next.js 15](https://nextjs.org/)** — App Router, React Server Components, Turbopack
- **[React 19](https://react.dev/)** — Latest concurrent features and optimizations
- **[TypeScript](https://www.typescriptlang.org/)** — Strict mode, zero compromises
- **[Turborepo](https://turbo.build/repo)** — Monorepo with intelligent caching

### **Data & API**
- **[tRPC](https://trpc.io/)** — End-to-end typesafe APIs with `superjson` transformer
- **[PostgreSQL](https://www.postgresql.org/)** + **[Prisma](https://www.prisma.io/)** — Relational database with type-safe ORM, hosted on **[NeonDB](https://neon.tech/)** (serverless Postgres)
- **[TanStack Query](https://tanstack.com/query)** — Server state management, caching, & synchronization

### **Authentication & Background Jobs**
- **[Clerk](https://clerk.com/)** — Complete auth with GitHub OAuth, middleware-protected routes
- **[Inngest](https://www.inngest.com/)** — Durable async workflows and background processing

### **UI & Styling**
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Modern CSS with native cascade layers
- **[Shadcn/UI](https://ui.shadcn.com/)** + **[Radix UI](https://www.radix-ui.com/)** — 60+ accessible components
- **[next-themes](https://github.com/pacocoursey/next-themes)** — Seamless dark mode
- **[Lucide Icons](https://lucide.dev/)** — Beautiful, consistent iconography

### **Developer Experience**
- **[Biome](https://biomejs.dev/)** — Blazing fast linting & formatting (replaces ESLint + Prettier)
- **[Sherif](https://github.com/QuiiBz/sherif)** — Validates monorepo dependencies
- **[Storybook](https://storybook.js.org/)** — Component documentation & visual testing

### **AI & Integrations**
- **[OpenAI](https://openai.com/)** — GPT integration for intelligent features
- **[E2B Code Interpreter](https://e2b.dev/)** — Sandboxed code execution
- **[Cloudinary](https://cloudinary.com/)** — Media management & optimization

---

## 📐 Architecture

### **Monorepo Structure**

```
turborepo-nextjs/
├── apps/
│   ├── web/                    # Main Next.js application
│   │   ├── app/                # App Router (route groups & pages)
│   │   │   ├── (home)/         # Public routes: /, /pricing, /auth
│   │   │   ├── api/            # API routes: tRPC, webhooks, Inngest
│   │   │   └── projects/       # Protected routes: /projects/*
│   │   │
│   │   ├── modules/            # 🎯 Feature modules (domain-driven)
│   │   │   ├── home/           # Home page features
│   │   │   ├── projects/       # Project management
│   │   │   ├── messages/       # Message handling
│   │   │   ├── usage/          # Usage tracking
│   │   │   └── layout/         # Shared layout components
│   │   │
│   │   ├── trpc/               # tRPC setup & routers
│   │   ├── inngest/            # Background job definitions
│   │   ├── prisma/             # Database schema & migrations (PostgreSQL)
│   │   ├── middleware.ts       # Auth protection (Clerk)
│   │   └── env.mjs             # Type-safe environment variables
│   │
│   └── storybook/              # Component playground (60+ stories)
│       └── stories/            # Visual documentation for all UI components
│
└── packages/
    ├── design-system/          # Shared UI library
    │   └── src/
    │       ├── components/     # Shadcn UI components (ui/ & magicui/)
    │       ├── hooks/          # Reusable React hooks
    │       └── lib/            # Utilities (cn, etc.)
    │
    └── typescript-config/      # Shared TypeScript configurations
        ├── base.json           # Base strict config
        ├── nextjs.json         # Next.js specific
        └── react-library.json  # For packages
```

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** 24.6.0+ (LTS recommended)
- **pnpm** 10.14.0+
- **PostgreSQL** database (NeonDB recommended, or local/Docker)

### **Quick Start**

```bash
# 1. Clone the repository
git clone https://github.com/nass59/turborepo-nextjs.git
cd turborepo-nextjs

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp apps/web/.env.example apps/web/.env.local
# Then edit apps/web/.env.local with your keys

# 4. Set up database & generate Prisma client
cd apps/web && pnpm prisma generate && pnpm prisma db push && cd ../..

# 5. Start all development servers
pnpm dev
```

**That's it!** Your apps will be running:
- 🌐 Web app: [localhost:3000](http://localhost:3000)
- 📚 Storybook: [localhost:6006](http://localhost:6006)

---

## 📦 Available Commands

### **Root Workspace**

```bash
# Development
pnpm dev              # Start all apps (web + storybook)
pnpm build            # Build all packages & apps for production
pnpm typecheck        # Run TypeScript checks across workspace
pnpm lint             # Lint all code with Biome
pnpm format           # Auto-format code with Biome

# Dependencies
pnpm check-dependencies  # Validate with Sherif
pnpm bump-deps          # Update all dependencies (except geist)
pnpm bump-ui            # Sync Shadcn UI components to design-system

# Cleanup
pnpm clean             # Remove build artifacts & caches
```

### **Individual Apps**

```bash
# Web App (apps/web)
cd apps/web
pnpm dev              # Start with Turbopack (fast refresh)
pnpm build            # Production build
pnpm start            # Start production server
pnpm typecheck        # Type check this app

# Storybook (apps/storybook)
cd apps/storybook
pnpm dev              # Start Storybook dev server
pnpm build            # Build static Storybook site
pnpm chromatic        # Deploy to Chromatic (visual testing)
```

---

## 🏗️ Development Workflow

### **Creating a New Feature**

1. **Add a new module** in `apps/web/modules/your-feature/`
   ```
   modules/your-feature/
   ├── ui/              # Components
   ├── server/          # Server functions
   ├── types.ts         # Types
   └── constants.ts     # Config
   ```

2. **Create tRPC procedures** in `apps/web/trpc/routers/your-feature.ts`
   ```typescript
   import { protectedProcedure } from '../trpc';

   export const yourFeatureRouter = {
     list: protectedProcedure.query(async ({ ctx }) => {
       // Server-side logic with ctx.clerkUserId
     }),
   };
   ```

3. **Use in components** via tRPC hooks
   ```typescript
   'use client';
   import { useTRPC } from '@/trpc/client';

   export function YourComponent() {
     const { data } = useQuery(trpc.yourFeature.yourAction.queryOptions());
     // ...
   }
   ```

### **Adding UI Components**

1. **Add to design system** via Shadcn CLI
   ```bash
   pnpm bump-ui  # Syncs latest Shadcn components
   ```

2. **Create Storybook story** in `apps/storybook/stories/`
   ```typescript
   import type { Meta, StoryObj } from '@storybook/react';
   import { YourComponent } from '@workspace/design-system/components/ui/your-component';

   const meta: Meta<typeof YourComponent> = {
     title: 'UI/YourComponent',
     component: YourComponent,
   };
   ```

3. **Use in your app**
   ```typescript
   import { YourComponent } from '@workspace/design-system/components/ui/your-component';
   ```

### **Background Jobs**

Define Inngest functions in `apps/web/inngest/functions.ts`:

```typescript
import { inngest } from './client';

export const processTask = inngest.createFunction(
  { id: 'process-task' },
  { event: 'app/task.process' },
  async ({ event, step }) => {
    // Durable async workflow
  }
);
```
---

## 🤖 AI-Optimized Development

This project includes comprehensive documentation for AI assistants:

- **`docs/AI-DEVELOPMENT-GUIDE.md`** — Guidelines for AI pair programming
- **`.github/copilot-instructions.md`** — GitHub Copilot specific instructions
- **ADRs** — Architectural Decision Records in `docs/adr/`
- **JSDoc** — All public APIs documented

**Helpful Scripts:**
```bash
./scripts/ai-analysis.sh       # Generate project analysis
./scripts/adr-helper.sh new    # Create new ADR
./scripts/debug-helper.sh      # Debug assistance
```

---

## 📚 Key Documentation

- **[Architecture Decision Records](docs/adr/)** — Why we made key technical choices
- **[AI Development Guide](docs/AI-DEVELOPMENT-GUIDE.md)** — Guidelines for AI-assisted development
- **[Copilot Instructions](.github/copilot-instructions.md)** — Project conventions for GitHub Copilot

### **Essential ADRs**
- [0002: Turborepo for Monorepo Management](docs/adr/0002-turborepo-monorepo-management.md)
- [0005: PostgreSQL with Prisma for User Data](docs/adr/0005-database-selection-for-user-data.md)
- [0006: Clerk Authentication](docs/adr/0006-authentication-flow-implementation.md)
- [0010: API Design Standards (tRPC)](docs/adr/0010-api-design-standards.md)

---

## 🎨 Design System

The `@workspace/design-system` package exports 60+ accessible components built on:
- **Radix UI** primitives
- **Tailwind CSS 4** styling
- **CVA** (class-variance-authority) for variants
- **Lucide Icons** for iconography

**Usage:**
```typescript
// Direct imports (no barrel files)
import { Button } from '@workspace/design-system/components/ui/button';
import { cn } from '@workspace/design-system/lib/utils';
```

**Explore components:**
```bash
cd apps/storybook && pnpm dev
# Visit http://localhost:6006
```

---

## 🚢 Deployment

### **Vercel (Recommended)**

```bash
# Connect your repo to Vercel
vercel

# Add environment variables in Vercel dashboard
# Deploy!
vercel --prod
```

### **Docker**

```bash
# Build
docker build -t turborepo-nextjs .

# Run
docker run -p 3000:3000 turborepo-nextjs
```

### **Environment Variables**
Ensure all required env vars are set in your deployment platform. Turborepo will automatically pass them through during build (configured in `turbo.json`).

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE.md](license.md) for details.

---

## 🙏 Acknowledgments

Built with amazing open source tools:

- **[Vercel](https://vercel.com)** — Hosting & deployment platform
- **[Shadcn](https://twitter.com/shadcn)** — UI component design
- **[Turborepo Team](https://turbo.build)** — Monorepo tooling
- **[Next.js Team](https://nextjs.org)** — The React framework
- **[Biome](https://biomejs.dev)** — Fast, unified toolchain
- **[tRPC](https://trpc.io)** — End-to-end type safety
- **[Clerk](https://clerk.com)** — Beautiful authentication

---

## 🎯 What's Next?

- [ ] Add comprehensive test coverage
- [ ] Implement E2E testing with Playwright
- [ ] Add performance monitoring (Sentry)
- [ ] Add CI/CD workflows
- [ ] Internationalization (i18n)

**Built with ❤️ by [nass190](https://twitter.com/nass190)**
