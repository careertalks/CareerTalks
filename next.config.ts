import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www to non-www redirect
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.careertalks.space" }],
        destination: "https://careertalks.space/:path*",
        permanent: true,
      },
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
