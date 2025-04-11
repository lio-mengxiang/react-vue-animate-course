import type { StateEnum } from '@/interface';
import { RefObject } from 'react';

export interface AnimationHomeGalleryProps {
  state: StateEnum;
  animationGalleryARef: RefObject<gsap.core.Timeline>;
  animationGalleryBRef: RefObject<gsap.core.Timeline>;
  animationGalleryCRef: RefObject<gsap.core.Timeline>;
}
