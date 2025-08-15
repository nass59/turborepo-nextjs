import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

import { Analytics } from "@/components/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { baseMetadata, baseViewport } from "@/constants/metadata";
import { ModalProvider } from "@/features/admin/common/providers/modal-provider";
import { type LayoutProps } from "@/types/common";

import "@workspace/design-system/components/ui/styles/global.css";

import { Toaster } from "@workspace/design-system/components/ui/sonner";
import { cn } from "@workspace/design-system/lib/utils";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "400",
});

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = baseViewport;

export default function RootLayout({ children }: LayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background min-h-screen scroll-smooth font-sans antialiased",
            fontSans.variable,
            fontHeading.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ModalProvider />
            <div className="flex min-h-screen flex-col">{children}</div>
            <Analytics />
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
