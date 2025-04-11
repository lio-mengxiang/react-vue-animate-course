import gsap from 'gsap';
import { IMAGE_COUNT } from '../constant';

import type { RefObject } from 'react';

interface ImageInitAnimationProps {
  items: NodeListOf<HTMLElement> | [];
  container: React.RefObject<HTMLElement | null>;
  animationGalleryARef: RefObject<gsap.core.Timeline>;
  animationGalleryBRef: RefObject<gsap.core.Timeline>;
  animationGalleryCRef: RefObject<gsap.core.Timeline>;
}

export const imageAnimationC = ({
  items,
  container,
  animationGalleryARef,
  animationGalleryBRef,
  animationGalleryCRef,
}: ImageInitAnimationProps) => {
  animationGalleryARef.current?.kill();
  animationGalleryBRef.current?.kill();
  animationGalleryCRef.current = gsap.timeline();

  if (container.current && items.length > 0) {
    animationGalleryCRef.current.to(items, {
      xPercent: 0, // 为每张图片设置不同的水平位移
      rotation: -15,
      yPercent: -50,
      scale: 1,
      duration: 0.4, // 动画持续时间
      ease: 'power3.inOut',
    });

    const angleIncrement = (2 * Math.PI) / IMAGE_COUNT;
    const radius = 200;

    animationGalleryCRef.current.to(items, {
      yPercent: (index) => {
        const angle = index * angleIncrement;
        // 计算每个元素的 x 和 y 坐标
        const y = radius * Math.sin(angle);
        return y - 50;
      },
      xPercent: (index) => {
        const angle = index * angleIncrement;
        // 计算每个元素的 x 和 y 坐标
        const x = radius * Math.cos(angle);
        return x;
      },
      scale: 0.4,
      duration: 0.4,
      rotation: 20,
    });
  }
};
