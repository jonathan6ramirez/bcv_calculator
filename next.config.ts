import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  output: "export",
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
