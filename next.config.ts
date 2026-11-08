import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {unoptimized: true},
  experimental: {cpus: 1, webpackMemoryOptimizations: true},
  async redirects() {
    return [
      {source: "/index.html", destination: "/", permanent: true},
      {source: "/:page.html", destination: "/:page", permanent: true},
    ];
  },
  async headers() {
    return [
      {source: "/assets/:path*", headers: [{key: "Cache-Control", value: "public, max-age=31536000, immutable"}]},
      {source: "/:path*", headers: [{key: "X-Content-Type-Options", value: "nosniff"}]},
    ];
  },
};
export default nextConfig;
