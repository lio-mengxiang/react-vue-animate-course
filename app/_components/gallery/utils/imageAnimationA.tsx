import gsap from 'gsap';
import type { RefObject } from 'react';

interface ImageInitAnimationProps {
  items: NodeListOf<HTMLElement> | [];
  container: React.RefObject<HTMLElement | null>;
  animationGalleryARef: RefObject<gsap.core.Timeline>;
  animationGalleryBRef: RefObject<gsap.core.Timeline>;
  animationGalleryCRef: RefObject<gsap.core.Timeline>;
}

const positionsY = [10, -10, 0, 0, -4, -4, -1];

export const imageAnimationA = ({
  items,
  container,
  animationGalleryARef,
  animationGalleryBRef,
  animationGalleryCRef,
}: ImageInitAnimationProps) => {
  animationGalleryBRef.current?.kill();
  animationGalleryCRef.current?.kill();
  animationGalleryARef.current = gsap.timeline();

  if (container.current && items.length > 0) {
    items.forEach((item) => {
      gsap.set(item, {
        x: '-50%',
      });
    });

    animationGalleryARef.current.to(items, {
      top: 0,
      rotation: -5,
      left: 0,
      ease: 'power3.inOut',
      duration: 0.6,
      // stagger: 0.05,
    });

    animationGalleryARef.current.to(items, {
      top: 0,
      ease: 'power1.out',
      duration: 0.1,
      // stagger: 0.05,
    });

    animationGalleryARef.current.to(items, {
      xPercent: (index) => {
        return (index - 2.5) * 90;
      }, // 为每张图片设置不同的水平位移
      yPercent: (index) => positionsY[index], // 为每张图片设置不同的垂直位移
      rotation: (index) => (index - 3) * 5, // 为每张图片设置不同的旋转角度
      duration: 0.6, // 动画持续时间
      scale: 1,
      ease: 'power3.inOut',
    });

    animationGalleryARef.current.to(
      items,
      {
        y: '-10%', // 相当于 translateY(-50%) 到 translateY(-60%) 之间的变化
        repeat: -1, // 无限循环
        yoyo: true, // 使动画来回切换
        duration: 2, // 动画时长，可以根据需要调整
        stagger: {
          each: 0.1, // 每张图片之间的延迟时间
        },
        ease: 'power2.inOut', // 缓动函数，模拟平滑的过渡
      },
      '-=0.4',
    );
  }
};
