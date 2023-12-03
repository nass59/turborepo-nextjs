import type { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"

const siteName = siteConfig.name
const siteDescription = siteConfig.description
const siteUrl = siteConfig.url
const siteAuthor = siteConfig.author
const siteGithubLink = siteConfig.links.github

/**
 * Define the metadata for the site
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | Admin | ${siteName}`,
  },
  description: siteDescription,
  category: "technology",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Storybook",
    "MongoDB",
  ],
  authors: [
    {
      name: siteAuthor,
      url: siteGithubLink,
    },
  ],
  creator: siteAuthor,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName: siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    creator: siteAuthor,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
  },
  manifest: absoluteUrl("/site.webmanifest"),
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

/**
 * Define the viewport for the site
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const baseViewport: Viewport = {
  themeColor: "black",
  colorScheme: "dark",
}
