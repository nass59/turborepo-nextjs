import type { Metadata } from 'next';

/**
 * Home page specific metadata configuration
 * Optimized for SEO and social sharing
 */
export const homeMetadata: Metadata = {
  title: 'TechShip - Next.js & React Tech Blog',
  description:
    'Latest updates, articles, and insights about NextJS, React, TypeScript, and modern web development. Expert tutorials and best practices.',
  keywords: [
    'NextJS',
    'React',
    'TypeScript',
    'Web Development',
    'Frontend',
    'JavaScript',
    'Tech Blog',
    'Tutorials',
    'Best Practices',
  ],
  openGraph: {
    title: 'TechShip - Next.js & React Tech Blog',
    description:
      'Latest updates, articles, and insights about NextJS, React, TypeScript, and modern web development.',
    type: 'website',
    url: '/',
    siteName: 'TechShip',
    images: [
      {
        url: '/og-image.jpg', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'TechShip - Next.js & React Tech Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechShip - Next.js & React Tech Blog',
    description:
      'Latest updates, articles, and insights about NextJS, React, TypeScript, and modern web development.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};
