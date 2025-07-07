'use client';
import React from 'react';
import { CodePreview } from '@/_components/code-preview';
import { H2 } from '@/_components/typography';

const code = `"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const marquee = document.getElementById('marquee');
      if (!marquee) return;

      const marqueeContent = marquee.querySelector('.marquee-content');
      if (!marqueeContent) return;

      let tween;
      let lastScrollTop = 0;
      let lastDirection = 'up'; // 默认方向，初始化时可以定义

      const createTween = (marquee, marqueeContent, direction, progress = 0, isResize = false) => {
        const marqueeWidth = parseInt(marqueeContent.offsetWidth);
        const distanceToTranslate = marqueeWidth * (direction === 'up' ? 1 : -1);

        gsap.set(marquee, { x: direction === 'up' ? -marqueeWidth : marqueeWidth });
        const t = gsap.fromTo(
          marquee.children,
          { x: 0 },
          {
            x: distanceToTranslate,
            duration: 5,
            repeat: -1,
            ease: 'linear',
          },
        );
        isResize ? t.progress(progress) : t.progress(1 - progress);
        return t;
      };

      const getScrollDirection = (current, last, lastDir) => {
        if (current > last) return 'down';
        if (current < last) return 'up';
        return lastDir;
      };

      const handleScroll = () => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        const newDirection = getScrollDirection(currentScrollTop, lastScrollTop, lastDirection);

        if (newDirection !== lastDirection) {
          const progress = tween ? tween.progress() : 0;
          tween && tween.kill();
          tween = createTween(marquee, marqueeContent, newDirection, progress);
          lastDirection = newDirection;
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
      };

      const playMarquee = () => {
        // 根据当前方向决定动画
        const progress = tween ? tween.progress() : 0;
        tween && tween.kill();
        tween = createTween(marquee, marqueeContent, lastDirection, progress, true);
      };

      playMarquee();

      window.addEventListener('resize', playMarquee);
      window.addEventListener('scroll', handleScroll, false);
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <div className="h-[100px]" ref={containerRef}>
      <div className="flex" id="marquee">
        <div className="marquee-content">
          <span
            className={'text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4 whitespace-nowrap'}
            style={{
              WebkitTextStroke: \`1px rgb(156 163 175)\`,
            }}
          >
            1234 & 5678
          </span>
          <span
            className={'text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4 whitespace-nowrap'}
            style={{
              WebkitTextStroke: \`1px rgb(156 163 175)\`,
            }}
          >
            9999 & 9999
          </span>
        </div>
        <div className="marquee-content">
          <span
            className={'text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4 whitespace-nowrap'}
            style={{
              WebkitTextStroke: \`1px rgb(156 163 175)\`,
            }}
          >
            1234 & 5678
          </span>
          <span
            className={'text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4 whitespace-nowrap'}
            style={{
              WebkitTextStroke: \`1px rgb(156 163 175)\`,
            }}
          >
            9999 & 9999
          </span>
        </div>
        <div className="marquee-content">
          <span
            className={'text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4 whitespace-nowrap'}
            style={{
              WebkitTextStroke: \`1px rgb(156 163 175)\`,
            }}
          >
            1234 & 5678
          </span>
          <span
            className={'text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4 whitespace-nowrap'}
            style={{
              WebkitTextStroke: \`1px rgb(156 163 175)\`,
            }}
          >
            9999 & 9999
          </span>
        </div>
      </div>
    </div>
  );
}`;

export function BlockMoveExample() {
  return (
    <div>
      <H2 subheading="适合场景：背景动画增强文字的吸引力">背景动画</H2>
      <CodePreview code={code} demoContainerClassName="pt-12 pb-16 flex justify-center bg-color-50" />
    </div>
  );
}
