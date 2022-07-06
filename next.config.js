/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
    MAPBOX_STYLE_URL: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL,
  },
};

module.exports = nextConfig;
