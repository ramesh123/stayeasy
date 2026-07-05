/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  outputFileTracingRoot: __dirname,
  devIndicators: false,
};

module.exports = nextConfig;
