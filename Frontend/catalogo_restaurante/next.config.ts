/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  experimental: {
    appDir: true, // habilita App Router
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // i18n se puede eliminar o manejar dentro del app/ con next-i18next
};

module.exports = nextConfig;
