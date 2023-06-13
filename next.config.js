/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-dev-connect-me.s3.sa-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
