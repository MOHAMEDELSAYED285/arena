/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['i.ibb.co'], // Add this line to allow images from i.ibb.co
      },
  }
  
  module.exports = nextConfig