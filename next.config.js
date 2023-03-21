/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CONTENT_STACK_BASE_URL: process.env.CONTENT_STACK_BASE_URL,
    CONTENT_STACK_API_KEY: process.env.CONTENT_STACK_API_KEY,
    CONTENT_STACK_DELIVERY_TOKEN: process.env.CONTENT_STACK_DELIVERY_TOKEN,
    CONTENT_STACK_ENVIRONMENT: process.env.CONTENT_STACK_ENVIRONMENT,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    EXAMPLE_TYPE: process.env.EXAMPLE_TYPE,
    ARTICLE: 9900,
  },
};

module.exports = nextConfig;
