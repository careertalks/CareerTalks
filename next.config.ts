import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/retail",
        destination: "/careers/retail-logistics",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
