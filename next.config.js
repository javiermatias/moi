/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // …
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
        target: 'serverless',
      }
};

module.exports = nextConfig;
