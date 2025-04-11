import { basePath } from './next.config';

export default function ImageLoader({ src }) {
  return `${basePath}${src}`;
}
