import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (www.cheeriostudios.com)
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
