/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // We'll handle ESLint separately from the build process
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@components': '/src/components',
        '@lib': '/src/lib',
        '@models': '/src/models',
        '@app': '/src/app',
      },
    };
    return config;
  },
};

export default nextConfig;