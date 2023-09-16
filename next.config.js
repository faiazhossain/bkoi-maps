/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@deck.gl/layers', '@mapbox/tiny-sdf'],
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = nextConfig
