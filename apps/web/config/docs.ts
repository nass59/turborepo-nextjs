import { type DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Introduction",
          href: "/docs/documentation",
        },
        {
          title: "Components",
          href: "/docs/components",
        },
        {
          title: "Code Blocks",
          href: "/docs/code-blocks",
        },
        {
          title: "Style Guide",
          href: "/docs/style-guide",
        },
        {
          title: "Search",
          href: "/docs/search",
          disabled: true,
        },
      ],
    },
    {
      title: "Blog",
      items: [
        {
          title: "Introduction",
          href: "/docs/blog",
          disabled: true,
        },
      ],
    },
    {
      title: "Dashboard",
      items: [
        {
          title: "Introduction",
          href: "/docs/dashboard",
          disabled: true,
        },
        {
          title: "Authentication",
          href: "/docs/auth",
          disabled: true,
        },
        {
          title: "Database with MongoDB",
          href: "/docs/database",
          disabled: true,
        },
      ],
    },
  ],
}
