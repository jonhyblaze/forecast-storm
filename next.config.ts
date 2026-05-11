import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/cli": ["./cli/forecast-storm"],
    "/install": ["./cli/install.sh"],
  },
};

export default nextConfig;
