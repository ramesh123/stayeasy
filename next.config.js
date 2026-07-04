/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
