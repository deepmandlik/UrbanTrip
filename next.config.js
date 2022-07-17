/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
    NEXT_PUBLIC_MAPBOX_STYLE_URL: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL,
    NEXT_PUBLIC_X_RAPIDAPI_KEY: process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
    NEXT_PUBLIC_X_RAPIDAPI_HOST: process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
  },
  images: {
    domains: ['media-cdn.tripadvisor.com' ,'maps.gstatic.com'],
  },
};

module.exports = nextConfig;
