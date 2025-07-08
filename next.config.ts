import type { NextConfig } from 'next';

const GITHUB_PAGE = 'github-page';
const isGithubPage = process.env.APP_ENV === GITHUB_PAGE;
const githubPageBasePath = '/react-vue-animate-course';

export function getBasePath() {
  if (isGithubPage) {
    return githubPageBasePath;
  }
  return '';
}

export function getHomePath() {
  if (isGithubPage) {
    return githubPageBasePath;
  }
  return '/';
}

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: getBasePath(),
  env: {
    isGithubPage: getBasePath(),
  },
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },
};

export default nextConfig;
