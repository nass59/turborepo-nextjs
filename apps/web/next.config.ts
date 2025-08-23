import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  transpilePackages: [
    '@workspace/tailwind-config',
    '@workspace/design-system/components/ui',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'turborepo-nextjs.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    mdxRs: true,
    optimizePackageImports: ['date-fns', '@headlessui/react'],
    typedRoutes: false,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark-default',
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
