# Storybook Project with Vite and shadcn/ui

This project is a Storybook setup using Vite as the build tool, pnpm as the package manager, and components from shadcn/ui. It provides a development environment for building and showcasing UI components in isolation.

## Technologies Used

- [Storybook](https://storybook.js.org/): A tool for developing UI components in isolation
- [Vite](https://vitejs.dev/): Next-generation frontend tooling
- [pnpm](https://pnpm.io/): Fast, disk space efficient package manager
- [shadcn/ui](https://ui.shadcn.com/): A collection of re-usable components built using Radix UI and Tailwind CSS

## Prerequisites

- Node.js (version 22 or later)
- pnpm

## Installation

Install dependencies using pnpm:

```bash
pnpm install
```

## Usage

### Running Storybook

To start the Storybook development server:

```
pnpm dev
```

This will open Storybook in your default browser, typically at `http://localhost:6006`.

### Building Storybook

To build Storybook for production:

```
pnpm build
```

This will create a static web application in the `storybook-static` directory, which you can deploy to any web hosting service.

## Working with shadcn/ui Components

This project uses components from shadcn/ui, which are built using Radix UI and Tailwind CSS. To add or customize components:

1. Use the shadcn/ui CLI to add new components (from root):

```bash
pnpm dlx shadcn@latest add button -c packages/design-system
```

2. The components will be added to your `packages/design-system/components/ui` directory.

3. Create stories for these components in the `stories` directory.

For more information on using shadcn/ui with Vite, refer to the [official documentation](https://ui.shadcn.com/docs/installation/vite).

## Project Structure

- `/stories`: Storybook story files
- `/.storybook`: Storybook configuration files
- `/public`: Storybook static files
