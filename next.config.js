/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nayemdevs.com',
      },
      {
        protocol: 'https',
        hostname: 'ae01.alicdn.com'
      }
    ],
  },
}

module.exports = nextConfig
