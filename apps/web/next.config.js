// @see https://beta.nextjs.org/docs/rendering/edge-and-nodejs-runtimes#global-runtime-option

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    transpilePackages: ["ui"],
    runtime: "experimental-edge", // 'node.js' (default) | 'experimental-edge'
  },
};

module.exports = nextConfig;
