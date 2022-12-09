// @see https://beta.nextjs.org/docs/rendering/edge-and-nodejs-runtimes#global-runtime-option
// @see https://beta.nextjs.org/docs/api-reference/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    transpilePackages: ["ui"],
    runtime: "experimental-edge",
  },
  // images: {
  //   formats: ["image/avif", "image/webp"],
  // },
};

module.exports = nextConfig;
