import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
      },
       {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
