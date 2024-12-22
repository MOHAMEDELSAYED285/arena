/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['i.ibb.co'],
      unoptimized: true, // This is important for GIFs
    },
    // Add this to ensure static files are served correctly
    publicRuntimeConfig: {
      staticFolder: '/assets',
    }
  }
  
  module.exports = nextConfig