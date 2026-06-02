/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.hoanghamobile.com',
    },
  ],
}
};

module.exports = nextConfig;
