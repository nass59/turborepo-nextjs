import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"

import "@shared/ui/styles/global.css"

import { baseMetadata } from "@/constants/metadata"

import { cn, Toaster } from "@shared/ui"
import { Analytics } from "@/components/analytics"
import { Help } from "@/components/helper"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

// Define the font styles
const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "400",
})

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

// Define the props for the RootLayout component
interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * Define the metadata for the site
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
 */
export const metadata: Metadata = baseMetadata

// @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen scroll-smooth bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Analytics />
          <Help />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
