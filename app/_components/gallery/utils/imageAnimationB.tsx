import gsap from 'gsap';
import type { RefObject } from 'react';

interface ImageInitAnimationProps {
  items: NodeListOf<HTMLElement> | [];
  container: React.RefObject<HTMLElement | null>;
  animationGalleryARef: RefObject<gsap.core.Timeline>;
  animationGalleryBRef: RefObject<gsap.core.Timeline>;
  animationGalleryCRef: RefObject<gsap.core.Timeline>;
}

export const imageAnimationB = ({
  items,
  container,
  animationGalleryARef,
  animationGalleryBRef,
  animationGalleryCRef,
}: ImageInitAnimationProps) => {
  animationGalleryARef.current?.kill();
  animationGalleryCRef.current?.kill();
  animationGalleryBRef.current = gsap.timeline();

  if (container.current && items.length > 0) {
    animationGalleryBRef.current.to(items, {
      xPercent: -80, // 为每张图片设置不同的水平位移
      rotation: 0,
      yPercent: 10,
      left: 0,
      top: 0,
      scale: 1,
      duration: 0.6, // 动画持续时间
      ease: 'power3.inOut',
    });

    animationGalleryBRef.current.to(items, {
      xPercent: (index) => {
        return `${100 * index - 90}`;
      }, // 为每张图片设置不同的水平位移
      yPercent: (index) => {
        return `${20 * index + 10}`;
      }, // 为每张图片设置不同的垂直位移
      scale: 1.3,
      duration: 0.4, // 动画持续时间
      ease: 'power3.inOut',
    });
  }
};
