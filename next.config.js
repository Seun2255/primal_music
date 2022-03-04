/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = {
  staticPageGenerationTimeout: 1500,
  images: {
    domains: ["e-cdns-images.dzcdn.net"],
  },
};
