import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable strict mode for React
  reactStrictMode: true,

  // Security headers for all routes
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Allow Go backend to call this SDUI server
          { key: 'Access-Control-Allow-Origin', value: process.env.ALLOWED_ORIGIN ?? '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },

  // Logging for production debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
