/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "airbnbnew.cybersoft.edu.vn",
        pathname: "**",
      },
      {
        protocol: "https",
        port: "",
        hostname: "cdn3.ivivu.com",
        pathname: "**",
      },
      {
        protocol: "https",
        port: "",
        hostname: "rawn-airbnb.vercel.app",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
