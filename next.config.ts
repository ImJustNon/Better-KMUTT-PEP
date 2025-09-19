import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  swcMinify: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/search",
        permanent: true, // set to false if temporary
      },
    ];
  },
};

export default nextConfig;
