'use client';

import React, { useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { H2 } from '@/_components/typography';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * 圆形套路
 * const numberOfItems = items.length;
 * // 计算每个元素需要的弧度
 * const angleIncrement = (2 * Math.PI) / numberOfItems;
 * // 半径
 * const radius = 100;
 * // 计算每张卡片需要转的角度，+90 度是为了让卡片从正上方开始旋转
 * const angle = index * angleIncrement;
 * const x = radius * Math.cos(angle);
 * const y = radius * Math.sin(angle);
 */
function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      initImages(containerRef);
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <div className="relative image-round-container flex justify-center h-[200px] items-center" ref={containerRef}>
      <div className="z-10">
        <span className="image-round">hover我有惊喜哦！</span>
      </div>
      <img width={50} height={50} className="item absolute opacity-0" src="/animation-home/blender.webp" alt="" />
      <img width={50} height={50} className="item absolute opacity-0" src="/animation-home/gsap.webp" alt="" />
      <img width={50} height={50} className="item absolute opacity-0" src="/animation-home/motion.webp" alt="" />
      <img width={50} height={50} className="item absolute opacity-0" src="/animation-home/react.webp" alt="" />
      <img width={50} height={50} className="item absolute opacity-0" src="/animation-home/vue.webp" alt="" />
    </div>
  );
}

function initImages(containerRef: RefObject<HTMLDivElement | null>) {
  const container = containerRef.current;
  if (!container) return;

  const items = container.querySelectorAll<HTMLImageElement>('.item');
  const hoverText = container.querySelector<HTMLElement>('.image-round');

  if (!hoverText) return;

  const numberOfItems = items.length;
  const angleIncrement = (2 * Math.PI) / numberOfItems;
  const radius = 100;

  items.forEach((item, index) => {
    const angle = index * angleIncrement;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const containerRect = container.getBoundingClientRect();

      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      gsap.to(item, {
        left: mouseX + x - containerRect.left,
        top: mouseY + y - containerRect.top,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        rotation: (angle * 180) / Math.PI,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const containerRect = container.getBoundingClientRect();

      gsap.to(item, {
        left: mouseX - containerRect.left,
        top: mouseY - containerRect.top,
        opacity: 0,
        rotation: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      });
    };

    hoverText.addEventListener('mousemove', handleMouseMove);
    hoverText.addEventListener('mouseleave', handleMouseLeave);
  });
}

export function RoundTextExample() {
  return (
    <div>
      <H2
        subheading="适合场景：对文字做图片说明"
        nextUrl={demoUrlList.hover.RoundTextExample.next}
        vueUrl={demoUrlList.hover.RoundTextExample.vue}
        reactUrl={demoUrlList.hover.RoundTextExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
