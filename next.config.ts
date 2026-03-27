import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Fix stale URLs found in GSC
      {
        source: "/retail",
        destination: "/careers/retail-logistics",
        permanent: true,
      },
      {
        source: "/fintech",
        destination: "/careers/fintech",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
