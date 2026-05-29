import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Turbopack persistent dev cache can corrupt on Windows (Downloads + ngrok/HMR file locks).
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    qualities: [75, 88, 90, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok-free.dev",
    "*.ngrok.app",
    "*.ngrok.io",
    "*.ngrok.dev",
  ],
  async redirects() {
    return [
      { source: "/bim-in-action", destination: "/#bim-in-action", permanent: true },
      { source: "/process", destination: "/#process", permanent: true },
      { source: "/tools", destination: "/#tools", permanent: true },
    ];
  },
};

export default nextConfig;
