// @see https://beta.nextjs.org/docs/rendering/edge-and-nodejs-runtimes#global-runtime-option
// @see https://beta.nextjs.org/docs/api-reference/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    transpilePackages: ["ui"],
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "turborepo-nextjs.vercel.app",
      },
    ],
  },
};

module.exports = nextConfig;
