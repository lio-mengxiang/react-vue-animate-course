'use client';
import React, { useEffect, useRef } from 'react';
import { H2 } from '@/_components/typography';
import { demoUrlList } from '@/cool-web/demo-list';
import { catalogInfo } from './constants';

/**
 * 背景的移动，本质就是 absolute 定位，然后移动到不同 dom 元素时，计算出宽高和 left、top (背景颜色块和背景都是相对于容器定位的，所以使用 getBoundingClientRect 那一套计算背景在容器的相对距离即可)
 */

const highlightColors = ['#A78BFA', '#60A5FA', '#34D399', '#FBBF24', '#F87171', '#38BDF8', '#F472B6', '#FDBA74'];

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const curIndex = useRef<string>('0');

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;

    if (!container || !highlight) return;

    const gridItems = container.querySelectorAll('.grid-item');

    const handleMouseEnter = (item: Element, color: string) => {
      const rect = item.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // getBoundingClientRect 是包含 border 的宽高，所以需要减去 border 的宽高
      highlight.style.transform = `translate(${rect.left - containerRect.left - 1}px, ${rect.top - containerRect.top - 1}px)`;
      highlight.style.width = `${rect.width - 1}px`;
      highlight.style.height = `${rect.height}px`;
      highlight.style.backgroundColor = color;

      const index = item.getAttribute('data-index') || '0';
      curIndex.current = index;
    };

    gridItems.forEach((item, index) => {
      const i = index % highlightColors.length;
      const color = highlightColors[i];
      const handleMouseEnter2 = () => {
        handleMouseEnter(item, color);
      };
      item.addEventListener('mouseenter', handleMouseEnter2);

      // 存储函数用于清理
      (item as any)._mouseenter = handleMouseEnter2;
      item.setAttribute('data-index', index.toString());
    });

    handleMouseEnter(gridItems[+curIndex.current], highlightColors[+curIndex.current]);
    const handleResize = () => {
      handleMouseEnter(gridItems[+curIndex.current], highlightColors[+curIndex.current]);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      // 清除事件监听
      gridItems.forEach((item) => {
        item.removeEventListener('mouseenter', (item as any)._mouseenter);
      });
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="h-48 w-full" ref={containerRef}>
      <div className="relative flex flex-col border border-solid border-color h-full">
        <div className="flex grow shrink basis-0 justify-center items-center border-b border-solid border-color">
          <div className="grid-item h-full flex grow shrink basis-0 justify-center items-center border-r border-solid border-color">
            <span className="z-10"> html </span>
          </div>
          <div className="grid-item h-full flex grow shrink basis-0 justify-center items-center border-r border-solid border-color">
            <span className="z-10"> css </span>
          </div>
          <div className="grid-item h-full flex grow shrink basis-0 justify-center items-center">
            <span className="z-10"> javascript </span>
          </div>
        </div>
        <div className="flex grow shrink basis-0  justify-center items-center">
          <div className="grid-item h-full flex grow shrink basis-0 justify-center items-center  border-r border-solid border-color">
            <span className="z-10"> gsap </span>
          </div>
          <div className="grid-item h-full flex grow shrink basis-0 justify-center items-center  border-r border-solid border-color">
            <span className="z-10"> react </span>
          </div>
          <div className="grid-item h-full flex grow shrink basis-0 justify-center items-center  border-r border-solid border-color">
            <span className="z-10"> next.js </span>
          </div>
          <div className="grid-item h-full flex grow shrink basis-0 justify-center items-center">
            <span className="z-10"> vue </span>
          </div>
        </div>
        <div
          className="absolute top-0 left-0 pointer-events-none transition-all duration-300 z-[2]"
          ref={highlightRef}
        ></div>
      </div>
    </div>
  );
}

export function BgMoveExample() {
  return (
    <div>
      <H2
        dataUrl="https://21st.dev/motion-primitives/magnetic/nested"
        subheading="适合场景：突出选中文字，且具有趣味性的场景"
        reactUrl={demoUrlList.hover.BgMoveExample.react}
        vueUrl={demoUrlList.hover.BgMoveExample.vue}
        nextUrl={demoUrlList.hover.BgMoveExample.next}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-8 flex justify-center bg-color-50 flex-col">
        <App />
      </div>
    </div>
  );
}
