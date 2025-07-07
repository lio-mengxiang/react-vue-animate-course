'use client';
import { H2 } from '@/_components/typography';
import { demoUrlList } from '@/cool-web/demo-list';
import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import { catalogInfo } from './constants';

/**
 * 1. 计算出每个方块的大小 - 根据容器的长宽除以方块的大小计算
 * 2. 随机区域如何生成 - 鼠标移动到某个方块，邻居的方块打乱高亮（每个方块 Math.radom 来随机）
 */
const config = {
  blockSize: 30,
  blockSizeW: 'w-8',
  blockSizeH: 'h-8',
};

function App() {
  const svgRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  useEffect(() => {
    const blockContainer = document.getElementById('blocks');
    const container = blockContainer?.parentElement;
    if (!blockContainer || !container) return;

    const blockContainerRect = container.getBoundingClientRect();
    const blockContainerWidth = blockContainerRect.width;
    const blockContainerHeight = blockContainerRect.height;
    const blockSize = config.blockSize;

    const numCols = Math.floor(blockContainerWidth / blockSize);
    const numRows = Math.floor(blockContainerHeight / blockSize);
    const numBlocks = numCols * numRows;

    function createBlock() {
      if (!blockContainer) return;

      for (let i = 0; i < numBlocks; i++) {
        const block = document.createElement('div');
        block.classList.add(
          config.blockSizeW,
          config.blockSizeH,
          'border',
          'border-[0.5px]',
          'border-white/10',
          'transition-colors',
          'duration-700',
          'ease',
        );
        (block as any).dataset.index = i;
        block.addEventListener('mouseenter', highlightRandomNeighbors);
        blockContainer.appendChild(block);
      }
    }

    function highlightRandomNeighbors(event: any) {
      if (!blockContainer) return;
      const index = parseInt(event.target.dataset.index);

      const neighbors = [
        index - 1,
        index + 1,
        index - numCols,
        index + numCols,
        index - numCols - 1,
        index - numCols + 1,
        index + numCols - 1,
        index + numCols + 1,
      ].filter((i) => i >= 0 && i < numBlocks);

      // 自身高亮
      event.target.classList.remove('border-white/10');
      event.target.classList.add('border-green-100', 'border-opacity-30');

      setTimeout(() => {
        event.target.classList.remove('border-green-100', 'border-opacity-30');
        event.target.classList.add('border-white/10');
      }, 500);

      // 完全随机：对每个邻居单独随机“是否高亮”
      neighbors.forEach((nIndex) => {
        const neighbor = blockContainer.children[nIndex];
        if (neighbor && Math.random() < 0.5) {
          // 50% 概率高亮
          neighbor.classList.remove('border-white/10');
          neighbor.classList.add('border-green-100', 'border-opacity-30');
          setTimeout(() => {
            neighbor.classList.remove('border-green-100', 'border-opacity-30');
            neighbor.classList.add('border-white/10');
          }, 500);
        }
      });
    }

    createBlock();

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;

      const rect = container.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const rotateY = (deltaX / (rect.width / 2)) * 30; // 控制旋转强度
      const rotateX = -(deltaY / (rect.height / 2)) * 30;

      gsap.to(svgRef.current, {
        rotateX,
        rotateY,
        transformOrigin: 'center',
        ease: 'power2.out',
        duration: 0.4,
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => containerRef.current?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#131313] rounded-lg w-full h-[300px] flex flex-wrap justify-start items-start overflow-hidden z-[2]  [perspective:200px]"
    >
      <div id="blocks" className="flex flex-wrap justify-start items-start"></div>
      <div
        ref={svgRef}
        className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
      >
        <FaceSvg width={67.375} height={69.25} style={{ transform: 'translate3d(0%, 0%, 100px)' }} />
      </div>
    </div>
  );
}

const FaceSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 539 554" fill="none" {...props}>
    <g data-name="Layer 1">
      <g>
        <path
          fill="#1eff1a"
          d="M537.48 289.42c-2.9-4.58-8.97-5.95-13.55-3.05l-46.77 29.53c-4.58 2.89-5.95 8.95-3.06 13.53 1.87 2.95 5.05 4.57 8.31 4.57 1.8 0 3.61-.49 5.24-1.52l8.84-5.58c-2.06 23.63-7.76 46.59-17.03 68.48-11.48 27.1-27.91 51.44-48.84 72.34-20.93 20.9-45.3 37.31-72.43 48.78-28.08 11.87-57.93 17.88-88.69 17.88s-60.6-6.02-88.69-17.88c-27.13-11.46-51.5-27.87-72.43-48.78-20.93-20.9-37.36-45.24-48.84-72.34-9.27-21.89-14.98-44.85-17.03-68.48l8.84 5.58c1.63 1.03 3.44 1.52 5.24 1.52 3.26 0 6.45-1.62 8.31-4.57 2.9-4.58 1.53-10.64-3.06-13.53l-46.77-29.53c-4.58-2.89-10.65-1.53-13.55 3.05-2.9 4.58-1.53 10.64 3.06 13.53l17.52 11.06c.88 30.82 7.37 60.73 19.35 89.01 12.46 29.44 30.31 55.87 53.04 78.57 22.73 22.7 49.2 40.52 78.67 52.97 30.52 12.89 62.93 19.43 96.34 19.43s65.82-6.53 96.35-19.43c29.48-12.45 55.94-30.27 78.67-52.97 22.72-22.7 40.57-49.14 53.04-78.57 11.97-28.28 18.47-58.19 19.35-89.01l17.52-11.06c4.59-2.89 5.95-8.96 3.06-13.53Z"
        />
        <path
          fill="#1eff1a"
          d="M227.22 158.31c5.51-58.15-10.08-107.2-34.84-109.54-24.76-2.34-49.29 42.9-54.81 101.06-5.51 58.15 10.08 107.2 34.84 109.54 24.75 2.34 49.29-42.9 54.81-101.06Z"
        />
        <path
          fill="#1eff1a"
          d="M366.59 259.35c24.75-2.34 40.35-51.38 34.84-109.54-5.51-58.15-30.05-103.4-54.81-101.06-24.76 2.34-40.35 51.38-34.84 109.54 5.51 58.15 30.05 103.4 54.81 101.06Z"
        />
        <path
          fill="#1eff1a"
          d="M248.64 39.48C240.51 16.48 218.55 0 192.74 0s-47.77 16.48-55.9 39.48c15.36-12.15 34.78-19.42 55.9-19.42s40.54 7.26 55.9 19.42Z"
        />
        <path
          fill="#1eff1a"
          d="M402.16 39.48c-8.13-23-30.09-39.48-55.9-39.48s-47.77 16.48-55.9 39.48c15.36-12.15 34.78-19.42 55.9-19.42s40.54 7.26 55.9 19.42Z"
        />
      </g>
    </g>
  </svg>
);

export function BlockChangeExample() {
  return (
    <div>
      <H2
        subheading="适合场景：更适合暗黑色的背景结合这种动画，有科技感和未来感"
        dataUrl="https://www.neoculturalcouture.com/"
        nextUrl={demoUrlList.hover.BlockChangeExample.next}
        reactUrl={demoUrlList.hover.BlockChangeExample.react}
        vueUrl={demoUrlList.hover.BlockChangeExample.vue}
      >
        {catalogInfo.text}
      </H2>
      <div className="flex justify-center">
        <App />
      </div>
    </div>
  );
}
