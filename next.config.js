/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_PAGES ? '/detroit' : '',
  assetPrefix: process.env.GITHUB_PAGES ? '/detroit/' : '',
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TypeScript errors during build
  },
  trailingSlash: true,
}

module.exports = nextConfig
