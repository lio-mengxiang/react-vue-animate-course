import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'docs',
  basePath: '/react-vue-animate-course',
  images: {
    path: '/react-vue-animate-course',
  },
};

export default nextConfig;
