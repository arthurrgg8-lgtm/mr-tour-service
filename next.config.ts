import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  allowedDevOrigins: ['leatha-exorbitant-unbravely.ngrok-free.dev', 'selection-corners-maryland-christmas.trycloudflare.com'],
};

export default nextConfig;
