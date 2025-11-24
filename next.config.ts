import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/.well-known/farcaster.json",
        destination:
          "https://api.farcaster.xyz/miniapps/hosted-manifest/0198fd14-6be3-fd68-3202-b459d18a4433",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
