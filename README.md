# Next.js 15 Turborepo Starter

A modern, production-ready monorepo built with Next.js 15, React 19, and the latest web technologies. This project demonstrates best practices for building scalable applications with a shared design system and component library.

## 👀 Demo

> **Note**
> This app is a work in progress and demonstrates modern web development practices.
>
> **Live Demo:** https://turborepo-nextjs.vercel.app/

## ✨ Features

### 🎨 **Frontend Stack**
- ⚡ **Next.js 15** with App Router and React Server Components
- 🚀 **Turborepo** monorepo with optimized caching and parallel builds
- 🎯 **TypeScript** strict mode with comprehensive type safety
- ⚛️ **React 19** with latest features and optimizations
- 🔐 **Clerk** for complete authentication solution with GitHub OAuth
- ⚙️ **Inngest** for background job processing and async workflows
- 🌍 **tRPC** for end-to-end type-safe API layer
- 🗄️ **PostgreSQL** with **Prisma** for relational data (projects, messages, usage tracking)
- 🎨 **Tailwind CSS 4** with modern CSS features
- 🧩 **Shadcn/UI** + **Radix UI** for accessible components
- 🌙 **next-themes** for dark/light mode support
- 🎭 **Framer Motion** for smooth animations
- ⚡️ **Biome** for fast linting and formatting
- 🚨 **Sherif** for dependency validation across workspace
- 🤖 **AI-optimized** with comprehensive TypeScript, JSDoc, and debugging tools

### Architecture

```
turborepo-nextjs/
├── apps/
│   ├── web/                # Next.js application
│   │   ├── app/            # App Router pages
│   │   │   ├── (home)/     # Public home routes (home, pricing, auth)
│   │   │   ├── api/        # API routes (tRPC, webhooks)
│   │   │   └── projects/   # Protected project routes
│   │   ├── components/     # Shared components
│   │   ├── modules/        # Feature modules
│   │   │   ├── home/       # Home page module
│   │   │   ├── layout/     # Layout components
│   │   │   ├── messages/   # Message handling
│   │   │   ├── projects/   # Project management
│   │   │   └── usage/      # Usage tracking
│   │   ├── trpc/           # tRPC configuration and routers
│   │   ├── inngest/        # Background job functions
│   │   ├── prisma/         # Database schema and migrations
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── types/          # TypeScript type definitions
│   └── storybook/          # Component documentation
│       └── stories/        # Component stories (60+ components)
└── packages/
    ├── design-system/      # Shared UI components
    │   ├── src/
    │   │   ├── components/ # UI components (ui/, magicui/)
    │   │   ├── hooks/      # Shared hooks
    │   │   └── lib/        # Utilities (cn, etc.)
    └── typescript-config/  # Shared TS configs
```

Each package and app is 100% **TypeScript** with strict type checking enabled.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 24.6.0 or later (LTS recommended)
- **pnpm** 10.14.0 or later
- **PostgreSQL** database (or use a cloud provider like Supabase, Neon, or Railway)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nass59/turborepo-nextjs.git
   cd turborepo-nextjs
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy environment template for the web app
   cp apps/web/.env.example apps/web/.env.local

   # Configure your environment variables
   # See Environment Variables section below for all required keys
   ```

4. **Set up the database:**
   ```bash
   # Generate Prisma client
   cd apps/web
   pnpm prisma generate

   # Run database migrations
   pnpm prisma migrate dev

   # (Optional) Seed the database
   pnpm prisma db seed
   ```

5. **Start the development servers:**
   ```bash
   # Start all development servers
   pnpm dev

   # Or start individual services
   pnpm --filter=web dev        # Next.js app (localhost:3000)
   pnpm --filter=storybook dev  # Storybook (localhost:6006)
   ```

### 🤖 AI Development Setup

This project is optimized for AI-assisted development. For the best experience:

1. **Install recommended VSCode extensions:**
   ```bash
   # Extensions are automatically suggested when you open the project
   # Or install manually from .vscode/extensions.json
   ```

2. **Use AI analysis tools:**
   ```bash
   # Generate comprehensive project analysis
   ./scripts/ai-analysis.sh

   # Debug assistance
   ./scripts/debug-helper.sh status
   ```

3. **Follow documentation standards:**
   - Read `docs/AI-DEVELOPMENT-GUIDE.md` for comprehensive guidelines
   - Use JSDoc comments for all public functions
   - Create ADRs for architectural decisions
   - Follow TypeScript strict mode patterns

4. **Quick development commands:**
   ```bash
   pnpm typecheck    # TypeScript validation
   pnpm lint         # Code quality checks
   pnpm format       # Auto-format code
   pnpm ai:analyze   # Run AI analysis
   pnpm build        # Production build
   ```

5. **Debugging:**
   - Use VSCode debug configurations in `.vscode/launch.json`
   - Debug Next.js app, Storybook, or tests
   - Comprehensive debugging tools available

### Root Level Commands

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm build            # Build all packages and apps
pnpm lint             # Run linting across workspace
pnpm typecheck        # Type-check all packages
pnpm format           # Format code with Biome

# Dependencies
pnpm check-dependencies  # Validate dependencies with Sherif
pnpm bump-deps          # Update all dependencies
pnpm bump-ui            # Update Shadcn UI components

# Cleanup
pnpm clean             # Clean all build artifacts
```

### Individual App Commands

```bash
# Web app
cd apps/web
pnpm dev              # Start Next.js with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Storybook
cd apps/storybook
pnpm dev              # Start Storybook dev server
pnpm build            # Build static Storybook
pnpm chromatic        # Deploy to Chromatic
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure tests pass
4. **Commit your changes:** `git commit -m 'Add amazing feature'`
5. **Push to the branch:** `git push origin feature/amazing-feature`
6. **Open a Pull Request**

## 📚 Learn More

### Tools & Libraries
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Clerk](https://clerk.com/) - Complete user management
- [Inngest](https://www.inngest.com/) - Durable workflow engine
- [Storybook](https://storybook.js.org/) - UI component development

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) for hosting and deployment platform
- [Shadcn](https://twitter.com/shadcn) for the amazing UI components
- [Turborepo team](https://turborepo.org) for the monorepo tooling
- [Next.js team](https://nextjs.org) for the incredible framework
