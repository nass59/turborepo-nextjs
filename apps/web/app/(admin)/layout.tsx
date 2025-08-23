import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Analytics } from '@/components/analytics';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { baseMetadata, baseViewport } from '@/constants/metadata';
import { ModalProvider } from '@/features/admin/common/providers/modal-provider';
import type { LayoutProps } from '@/types/common';

import '@workspace/design-system/styles/globals.css';

import { Toaster } from '@workspace/design-system/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = baseViewport;

export default function RootLayout({ children }: LayoutProps) {
  return (
    <ClerkProvider>
      <html
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        lang="en"
        suppressHydrationWarning
      >
        <body>
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
