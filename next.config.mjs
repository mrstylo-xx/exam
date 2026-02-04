/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14.2.0+ এ Node.js 20.x এর সাথে compatible
  webpack: (config, { isServer }) => {
    // Undici এর সাথে compatibility issue fix
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;