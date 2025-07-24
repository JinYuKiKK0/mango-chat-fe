import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: process.env.IS_OUTPUT_EXPORT ? "export" : "standalone",
  output: 'export',
  basePath: "/admin-one-react-tailwind",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin-one-react-tailwind",
        basePath: false,
        permanent: false,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.justboil.me",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
