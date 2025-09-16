import { cn } from '@workspace/design-system/lib/utils';
import type { Metadata, Viewport } from 'next';
import { A11ySkipLink } from '@/components/a11y-skip-link';
import { RootProviders } from '@/components/providers/root-providers';
import { geistSans } from '@/config/fonts';
import { baseMetadata, baseViewport } from '@/constants/metadata';
import { SiteHeader } from '@/modules/layout/ui/site-header';
import { TRPCReactProvider } from '@/trpc/client';
import type { LayoutProps } from '@/types/common';

import '@workspace/design-system/styles/globals.css';

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
    <TRPCReactProvider>
      <html
        className={cn(geistSans.variable, 'antialiased')}
        lang="en"
        suppressHydrationWarning
      >
        <body className="flex min-h-screen flex-col" data-a11y="app-root">
          {/* Skip link placed as the first focusable element inside body for accessibility */}
          <A11ySkipLink />
          {/* Wrap the application in global providers */}
          <RootProviders>
            <SiteHeader />
            <main
              // Use aria-label for robustness even if header/site-title changes.
              aria-label="Main content"
              className="flex-1"
              data-a11y="main"
              id="main-content"
              tabIndex={-1}
            >
              {children}
            </main>
          </RootProviders>
        </body>
      </html>
    </TRPCReactProvider>
  );
}
