import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@styles/global.css"
import { siteConfig } from "@config/site"
import { absoluteUrl, cn } from "@lib/utils"
import { Analytics } from "@components/analytics"
import { TailwindIndicator } from "@components/tailwind-indicator"
import { Help } from "@components/ui/helper"
import { Toaster } from "@components/ui/toaster"

const fontSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})
interface RootLayoutProps {
  children: React.ReactNode
}

// @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
      name: siteConfig.author,
      url: siteConfig.links.github,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/og.jpg"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: siteConfig.author,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: absoluteUrl("/site.webmanifest"),
  themeColor: "#000000",
  colorScheme: "dark",
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        "scroll-smooth bg-white font-sans text-slate-900 antialiased",
        fontSans.variable
      )}
    >
      <head />
      <body className="min-h-screen">
        {children}
        <Analytics />
        <Help />
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  )
}
