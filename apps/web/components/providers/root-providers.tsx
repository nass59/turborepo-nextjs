'use client';

import { Toaster } from '@workspace/design-system/components/ui/sonner';
import type { PropsWithChildren } from 'react';
import { Analytics } from '@/components/analytics';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { isProd } from '@/lib/env';

/**
 * Consolidates all client-side providers & global singleton UI helpers.
 * Keeps the root layout lean and enables reuse across different app shells.
 */
export const RootProviders = ({ children }: PropsWithChildren) => (
  <ThemeProvider attribute="class" defaultTheme="dark">
    {children}
    <Analytics />
    <Toaster />
    {!isProd && <TailwindIndicator />}
  </ThemeProvider>
);
