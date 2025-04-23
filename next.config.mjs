import createNextIntlPlugin from 'next-intl/plugin';

// Apply the plugin with the path to your request locale handler
const withNextIntl = createNextIntlPlugin({
  // This must point to your locale detection logic
  // Make sure `request.ts` exports `getLocale` or compatible
  server: './src/i18n/request.ts'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      }
    ]
  }
};

// Export the final config wrapped with next-intl
export default withNextIntl(nextConfig);