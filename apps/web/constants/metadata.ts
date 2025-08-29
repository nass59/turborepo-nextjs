import type { Metadata, Viewport } from 'next';

import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';

// Derive frequently used site primitives for reuse in metadata objects
const siteName = siteConfig.name;
const siteDescription = siteConfig.description;
const siteUrl = siteConfig.url;
const siteAuthor = siteConfig.author; // Prefer @handle form for Twitter
const siteGithubLink = siteConfig.links.github;
const siteOgImage = siteConfig.ogImage || absoluteUrl('/og.jpg');
const siteTwitter = siteConfig.links.twitter;

/**
 * Base (global) metadata applied to all routes.
 * Route segments can extend/override this via exported `generateMetadata` or segment metadata files.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  category: 'technology',
  generator: 'Next.js 15',
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI',
    'Storybook',
    'MongoDB',
    'TypeScript',
    'Web Performance',
    'Accessibility',
  ],
  authors: [
    {
      name: siteAuthor,
      url: siteGithubLink,
    },
  ],
  creator: siteAuthor,
  publisher: siteAuthor,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName,
    images: [
      {
        url: siteOgImage,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    creator: siteAuthor,
    site: siteTwitter
      ? `@${siteTwitter.split('twitter.com/').pop()}`
      : undefined,
    images: [
      {
        url: siteOgImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  appleWebApp: {
    title: siteName,
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  manifest: absoluteUrl('/site.webmanifest'),
  applicationName: siteName,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/**
 * Base viewport definition (injected into <meta name="viewport"> & related theme color tags).
 * Provides dynamic theme color for light vs. dark preference.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const baseViewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'dark light',
  // width / initialScale can be customized here if needed
};
