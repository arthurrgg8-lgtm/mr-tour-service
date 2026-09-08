import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  allowedDevOrigins: ['*.ngrok-free.dev', '*.trycloudflare.com', '*.loca.lt'],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

