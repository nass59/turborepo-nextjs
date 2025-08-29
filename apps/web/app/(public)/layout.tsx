import { Toaster } from '@workspace/design-system/components/ui/sonner';
import type { Metadata, Viewport } from 'next';
import { Geist, Pacifico } from 'next/font/google';
import { Ay11SkipLink } from '@/components/a11y-skip-link';
import { Analytics } from '@/components/analytics';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { baseMetadata, baseViewport } from '@/constants/metadata';
import { Help } from '@/features/public/common/ui/helper';
import { Header } from '@/modules/home/ui/home-header';
import type { LayoutProps } from '@/types/common';
import '@workspace/design-system/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Pacifico({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: '400',
});

/**
 * Define the metadata for the site
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
 */
export const metadata: Metadata = baseMetadata;

/**
 * Define the viewport for the site
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = baseViewport;

/**
 * Define the root layout for the site
 * Only the root layout can contain <html> and <body> tags.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layouts
 */
export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          forcedTheme="dark"
        >
          <div className="flex min-h-screen flex-col">
            <Ay11SkipLink />
            <Header />
            {children}
          </div>
          <Analytics />
          <Help />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
