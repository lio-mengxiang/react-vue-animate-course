'use client';
import React, { useEffect, useRef, useState } from 'react';
import { H2 } from '@/_components/typography';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { demoUrlList } from '@/cool-web/demo-list';
import { catalogInfo } from './constants';

/**
 * 无限循环思路：39.5 37.5 35.5 ....0, 39.5 37.5 35.5....0,...
 * mask 遮罩 radial-gradient(circle, rgba(6,6,6,0) 0%, #060606 100%)
 */

function App() {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-[#060606]">
      <Squares direction="diagonal" speed={0.5} squareSize={40} borderColor="#333" hoverFillColor="#222" />
    </div>
  );
}

interface SquaresProps {
  direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

function Squares({
  direction = 'right',
  speed = 1,
  borderColor = '#333',
  squareSize = 40,
  hoverFillColor = '#222',
  className,
}: SquaresProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [grid, setGrid] = useState({
    rows: 0,
    cols: 0,
  });

  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateGrid = () => {
      const container = containerRef.current;
      const parent = container?.parentElement;
      if (!container || !parent) return;
      const cols = Math.ceil(parent.offsetWidth / squareSize) + 1;
      const rows = Math.ceil(parent.offsetHeight / squareSize) + 1;
      setGrid({ rows, cols });
    };

    window.addEventListener('resize', updateGrid);
    updateGrid();

    return () => {
      window.removeEventListener('resize', updateGrid);
    };
  }, [squareSize]);

  useGSAP(
    () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      const container = containerRef.current;
      if (!container) return;

      const offsetX = { value: offset.current.x };
      const offsetY = { value: offset.current.y };

      // 使用 modifiers 来让偏移量自动 wrap
      gsap.to(
        {},
        {
          duration: 1000, // 很长的 duration，让 repeat 无限
          repeat: -1,
          ease: 'linear',
          onUpdate: () => {
            switch (direction) {
              case 'right':
                // 相当于快速移动到 39.5（相当于 square 向右移动 0.5）, 39, 模拟从右到左
                offsetX.value = (offsetX.value - effectiveSpeed + squareSize) % squareSize;
                break;
              case 'left':
                offsetX.value = (offsetX.value + effectiveSpeed + squareSize) % squareSize;
                break;
              case 'up':
                offsetY.value = (offsetY.value + effectiveSpeed + squareSize) % squareSize;
                break;
              case 'down':
                offsetY.value = (offsetY.value - effectiveSpeed + squareSize) % squareSize;
                break;
              case 'diagonal':
                offsetX.value = (offsetX.value - effectiveSpeed + squareSize) % squareSize;
                offsetY.value = (offsetY.value - effectiveSpeed + squareSize) % squareSize;
                break;
            }

            (container as HTMLElement).style.transform = `translate(${offsetX.value}px, ${offsetY.value}px)`;
          },
        },
      );
    },
    { scope: containerRef, dependencies: [direction, speed, squareSize] },
  );

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* 网格 container */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${grid.cols}, ${squareSize}px)`,
          gridTemplateRows: `repeat(${grid.rows}, ${squareSize}px)`,
        }}
      >
        {Array.from({ length: grid.rows * grid.cols }).map((_, idx) => (
          <div
            key={idx}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverFillColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            style={{
              width: squareSize,
              height: squareSize,
              boxSizing: 'border-box',
              border: `0.5px solid ${borderColor}`,
            }}
          />
        ))}
      </div>

      {/* radial gradient mask */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle, rgba(6,6,6,0) 0%, #060606 100%)',
        }}
      />
    </div>
  );
}

export function MoveBlockExample() {
  return (
    <div>
      <H2
        subheading="适合场景：用于科技感和动感的暗色系网站某一屏的背景"
        nextUrl={demoUrlList.hover.MoveBlockExample.next}
        reactUrl={demoUrlList.hover.MoveBlockExample.react}
        vueUrl={demoUrlList.hover.MoveBlockExample.vue}
      >
        {catalogInfo.text}
      </H2>
      <div className="flex justify-center">
        <App />
      </div>
    </div>
  );
}
