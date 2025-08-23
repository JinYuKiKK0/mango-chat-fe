import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: process.env.IS_OUTPUT_EXPORT ? "export" : "standalone",
  output: 'export',
  basePath: "",
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
  typescript: {
    ignoreBuildErrors: true, // 将此选项设置为 true 以忽略 TypeScript 构建错误
  },
};

export default nextConfig;
