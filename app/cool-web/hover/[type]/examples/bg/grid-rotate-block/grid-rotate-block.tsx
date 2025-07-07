'use client';
import { H2 } from '@/_components/typography';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { demoUrlList } from '@/cool-web/demo-list';
import { catalogInfo } from './constants';

/**
 * 1、Spotlight 本身只是一个圆形的 blur 效果
 */
function App() {
  const containerRef = useRef(null);
  useGSAP(
    (context, contextSafe: any) => {
      const grid: any = containerRef.current;
      const cells: any[] = [];

      // 创建格子
      for (let i = 0; i < 60; i++) {
        const cell = document.createElement('div');
        cell.className = 'w-[20px] h-[20px] border-2 border-[#555] bg-transparent';
        grid.appendChild(cell);
        cells.push(cell);
      }

      // 鼠标移动事件
      const handleMouseMove = contextSafe((e: any) => {
        const rect = grid.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        cells.forEach((cell) => {
          const cellRect = cell.getBoundingClientRect();
          const cellX = cellRect.left - rect.left + cellRect.width / 2;
          const cellY = cellRect.top - rect.top + cellRect.height / 2;
          const distance = Math.hypot(mouseX - cellX, mouseY - cellY);

          if (distance < 60) {
            const angle = (Math.atan2(mouseY - cellY, mouseX - cellX) * 180) / Math.PI;

            gsap.to(cell, {
              rotate: angle,
              backgroundColor: '#41ff60',
              borderColor: '#222',
              duration: 0.3,
              ease: 'power2.out',
            });
          } else {
            gsap.to(cell, {
              rotate: 0,
              backgroundColor: 'transparent',
              borderColor: '#555',
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        });
      });

      // 鼠标移出事件
      const handleMouseLeave = contextSafe(() => {
        cells.forEach((cell) => {
          gsap.to(cell, {
            rotate: 0,
            backgroundColor: 'transparent',
            borderColor: '#555',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });

      grid.addEventListener('mousemove', handleMouseMove);
      grid.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        grid.removeEventListener('mousemove', handleMouseMove);
        grid.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: containerRef, dependencies: [] },
  );
  return (
    <div ref={containerRef} className="relative grid justify-center grid-cols-[repeat(10,_20px)] gap-[5px] mt-10"></div>
  );
}

export function GridRotateBlockExample() {
  return (
    <div>
      <H2
        subheading="适合场景：增强网页局部的趣味性"
        nextUrl={demoUrlList.hover.GridRotateBlockExample.next}
        reactUrl={demoUrlList.hover.GridRotateBlockExample.react}
        vueUrl={demoUrlList.hover.GridRotateBlockExample.vue}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-8 flex justify-center bg-color-50 flex-col">
        <App />
      </div>
    </div>
  );
}
