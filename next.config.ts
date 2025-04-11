import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'docs',
  basePath: '/react-vue-animate-course',
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },
};

export default nextConfig;
