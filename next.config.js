/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER: "https://test-build-service.onrender.com/",
  },
};

module.exports = nextConfig;
