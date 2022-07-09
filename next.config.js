/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
    MAPBOX_STYLE_URL: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL,
    X_RAPIDAPI_KEY: process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
    X_RAPIDAPI_HOST: process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
  },
};

module.exports = nextConfig;
