/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com;
              style-src 'self' 'unsafe-inline' https://*.googleapis.com;
              img-src 'self' data: https://*.googleapis.com https://*.gstatic.com;
              font-src 'self' https://*.gstatic.com;
              connect-src 'self' https://*.googleapis.com https://generativelanguage.googleapis.com wss://api.swasthyacare.com https://api.mapbox.com https://api.yourdomain.com;
              frame-src 'self';
              object-src 'none';
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
