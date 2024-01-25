/** @type {import('next').NextConfig} */
import "dotenv/config";
const nextConfig = {
  env: { JWT_SECRET: process.env.JWT_SECRET },
};

export default nextConfig;
