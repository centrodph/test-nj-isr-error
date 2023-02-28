/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER: "https://test-build-service.onrender.com/",
    ARTICLE: 9900,
  },
};

module.exports = nextConfig;
