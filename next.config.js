/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_PAGES ? '/detroit' : '', // Replace 'detroit' with your repo name
  assetPrefix: process.env.GITHUB_PAGES ? '/detroit/' : '', // Replace 'detroit' with your repo name
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TypeScript errors during build
  },
  // Ensure static files are copied correctly
  distDir: 'dist',
  trailingSlash: true,
}

module.exports = nextConfig
