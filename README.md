# Next.js 14 with Turborepo

An open source application built using the new router, server components and everything new in Next.js 14.

## Demo 👀

> **Warning**
> This app is a work in progress.
> https://turborepo-nextjs.vercel.app/

## Features 🌟

- 🚀 Monorepo using **Turborepo**
- 📁 New `/app` dir,
- 🗂️ Routing, Layouts, Nested Layouts and Layout Groups
- 🌎 Data Fetching, Caching and Mutation
- ⏱️ Loading UI
- 🛠️ Server and Client Components
- 🚦 API Routes and Middlewares
- 👮‍♂️ Authentication using **Clerk**
- 🌱 Database using **MongoDB**
- 🧩 UI Components built using **Radix UI**
- 🎨 Styled using **Tailwind CSS**
- 👨‍🎨 Styleguide using **Storybook**
- ⚡️ Validations using **Zod**
- 🛟 Validation for type-safe environment variables using **T3 Env**
- 👷🏼‍♂️ Written in **TypeScript**

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: another [Next.js 14](https://nextjs.org) app
- `storybook`: a [Storybook](https://storybook.js.org/blog/in-app-tour-for-new-users/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `ts-config`: `tsconfig.json`s used throughout the monorepo
- `tailwind-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpm dlx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
