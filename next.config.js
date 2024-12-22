/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['i.ibb.co'],
      unoptimized: true,
    },
    // Ensure static files are served correctly
    async rewrites() {
      return [
        {
          source: '/assets/:path*',
          destination: '/assets/:path*',
        },
      ]
    },
    // Add this to properly handle static assets
    webpack(config) {
      config.module.rules.push({
        test: /\.(gif|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
      });
      return config;
    },
  }
  
  module.exports = nextConfig