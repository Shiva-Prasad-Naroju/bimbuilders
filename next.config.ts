import type { NextConfig } from "next";

// SHA-256 of the inline theme-init script in app/layout.tsx. If you edit that
// script (even whitespace), recompute via:
//   node -e "const c=require('crypto');console.log('sha256-'+c.createHash('sha256').update(SCRIPT_STRING).digest('base64'))"
const THEME_INIT_SCRIPT_HASH = "'sha256-jX2/O1VqTE5dKmFIg2vylPppOcD4cEw+Tc5mpVABc78='";

const isProd = process.env.NODE_ENV === "production";

// `script-src 'self' 'unsafe-eval'` in dev allows Next's HMR/devtools eval.
// In prod we lock down: only same-origin scripts + the hashed inline theme-init.
const scriptSrc = isProd
  ? ["'self'", THEME_INIT_SCRIPT_HASH].join(" ")
  : ["'self'", "'unsafe-eval'", "'unsafe-inline'"].join(" ");

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  // Tailwind v4 + framer-motion inject styles at runtime; 'unsafe-inline' for
  // styles is the standard accepted relaxation when no inline JS is allowed.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self' data:",
  // /api/chat -> api.groq.com, /api/contact -> api.emailjs.com. Restrict to those.
  "connect-src 'self' https://api.groq.com https://api.emailjs.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
];

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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/bim-in-action", destination: "/#bim-in-action", permanent: true },
      { source: "/process", destination: "/#process", permanent: true },
      { source: "/tools", destination: "/#tools", permanent: true },
    ];
  },
};

export default nextConfig;
