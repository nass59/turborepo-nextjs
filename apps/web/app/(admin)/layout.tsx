import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { ClerkProvider } from "@clerk/nextjs"

import "@shared/ui/styles/global.css"

import { baseMetadata } from "@/constants/metadata"
import { ModalProvider } from "@/providers/modal-provider"

import { cn, Toaster } from "@shared/ui"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

// Define the font styles
const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
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

/**
 * RootLayout is the root layout component for the admin pages.
 * It wraps its children with necessary providers and layout styles.
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen scroll-smooth bg-background font-sans antialiased",
            fontSans.variable,
            fontHeading.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ModalProvider />
            {children}
            <Analytics />
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
