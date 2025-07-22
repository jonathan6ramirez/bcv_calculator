import type { NextConfig } from "next";

const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";
const isProd = process.env.NODE_ENV === "production";
const repoName = "bcv_calculator";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  output: "export",
  typescript: { ignoreBuildErrors: false },
  assetPrefix: isGhPages && isProd ? `/${repoName}/` : "",
  //assetPrefix: "/bcv_calculator/",
  basePath: isGhPages && isProd ? `/${repoName}` : "",
  //basePath: "/bcv_calculator",
};

export default nextConfig;
