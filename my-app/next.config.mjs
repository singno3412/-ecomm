/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    typescript: {
      ignoreBuildErrors: false,
    },
    experimental: {
        appDir: true,
      },
  };
export default nextConfig;
