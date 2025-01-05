/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: [
        'localhost:3000',
        'localhost:3001',
        '192.168.50.174:3000',
        '192.168.50.174:3001'
      ]
    },
    optimizePackageImports: [
      '@geist-ui/core',
      '@headlessui/react',
      '@tanstack/react-query'
    ]
  },
};

export default nextConfig;
