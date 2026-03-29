import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Note: www-to-non-www redirect is handled in Vercel domain settings
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
