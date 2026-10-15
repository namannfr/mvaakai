import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Existing mvaak.com URLs are preserved as-is. These redirects cover new
  // short routes and common alternates so no inbound link breaks.
  async redirects() {
    return [
      { source: "/insights", destination: "/blog", permanent: true },
      { source: "/insights/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/services/egocentric-video", destination: "/services/egocentric-video-data", permanent: true },
      { source: "/egocentric", destination: "/services/egocentric-video-data", permanent: true },
      { source: "/egocentric-data", destination: "/services/egocentric-video-data", permanent: true },
      { source: "/partners", destination: "/partnerships", permanent: true },
      { source: "/partner", destination: "/partnerships", permanent: true },
      { source: "/join", destination: "/partnerships", permanent: false },
      { source: "/apply", destination: "/partnerships#apply", permanent: false },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/start-a-project", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
