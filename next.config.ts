import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly disable trailing slashes — prevents 308 redirect chains
  // that Google flags as "Page with redirect" in GSC.
  trailingSlash: false,

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
      // Catch common misspellings and old URL patterns
      {
        source: "/career/:path*",
        destination: "/careers/:path*",
        permanent: true,
      },
      {
        source: "/compare",
        destination: "/career-explorer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
