import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx'],
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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    mdxRs: true,
    optimizePackageImports: ['date-fns', '@headlessui/react'],
    typedRoutes: false,
  },
};

export default nextConfig;
