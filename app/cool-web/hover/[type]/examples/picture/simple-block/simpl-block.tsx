'use client';
import React, { useEffect, useRef, useState } from 'react';
import { H2 } from '@/_components/typography';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * 图片填满 opacity-0 的方块
 * hover 时 方块 opacity-75，设置一个 setTimeout 回调，300ms 后移除 opacity-75 类名
 */
function App() {
  const container = useRef(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [blocks, setBlocks] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const img = imgRef.current;
    calculateBlocks();

    function calculateBlocks() {
      if (!img) return;
      const width = img.width;
      const height = img.height;
      const wNumber = 10;
      const hNumber = 10;
      const blockWidth = width / wNumber;
      const blockHeight = height / hNumber;

      setBlocks(wNumber * hNumber);
      setWidth(blockWidth);
      setHeight(blockHeight);
    }
  }, []);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLDivElement>('.block').forEach((block) => {
        let timeoutId: any;
        block.addEventListener('mouseover', () => {
          clearTimeout(timeoutId);
          block.classList.add('opacity-75');
          timeoutId = setTimeout(() => {
            block.classList.remove('opacity-75');
          }, 300);
        });
      });
    },
    { scope: container, dependencies: [blocks] },
  );

  return (
    <div ref={container} className="w-60 h-60 relative">
      <img className="w-full h-full absolute object-cover" ref={imgRef} src="/animation-home/blender.webp" alt="" />
      <div
        className="absolute w-full h-full"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${width}px, 1fr))`,
        }}
      >
        {Array.from({ length: blocks }).map((_, i) => (
          <div
            key={i}
            className="block opacity-0 mix-blend-hard-light bg-slate-100 transition-all duration-300 ease-in"
            style={{ width, height }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export function SimpleBlockExample() {
  return (
    <div>
      <H2
        subheading="适合场景：展示图片时多一些交互效果，进阶要使用 webgl 生成更复杂的效果"
        nextUrl={demoUrlList.hover.SimpleBlockExample.next}
        vueUrl={demoUrlList.hover.SimpleBlockExample.vue}
        reactUrl={demoUrlList.hover.SimpleBlockExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
