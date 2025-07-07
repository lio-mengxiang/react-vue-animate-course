'use client';
import { H2 } from '@/_components/typography';
import { cs } from '@/_utils';
import { demoUrlList } from '@/cool-web/demo-list';
import { useSpring, useTransform, motion } from 'motion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 1、Spotlight 本身只是一个圆形的 blur 效果
 */
function App() {
  return (
    <div className="relative w-full aspect-video h-[200px] rounded border border-zinc-100 bg- dark:border-zinc-800 dark:bg-black">
      <Spotlight className="from-blue-800 via-blue-600 to-blue-400 blur-xl" size={64} />

      <div className="absolute inset-0">
        <svg className="h-full w-full">
          <defs>
            <pattern id="grid-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M0 4H4M4 4V0M4 4H8M4 4V8"
                stroke="currentColor"
                strokeOpacity="0.3"
                className="stroke-white dark:stroke-black"
              />
              <rect
                x="3"
                y="3"
                width="2"
                height="2"
                fill="currentColor"
                fillOpacity="0.25"
                className="fill-white dark:fill-black"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    </div>
  );
}

function Spotlight({ className, size = 200, springOptions = { bounce: 0 } }: any) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  // 设置到鼠标中心
  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent !== null) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement],
  );

  useEffect(() => {
    if (!parentElement) return;

    parentElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cs(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200',
        'from-zinc-50 via-zinc-100 to-zinc-200',
        // isHovered ? 'opacity-100' : 'opacity-0',
        className,
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
      }}
    />
  );
}

export function SpotlightExample() {
  return (
    <div>
      <H2
        dataUrl="https://21st.dev/ibelick/spotlight/default"
        subheading="适合场景：更适合暗黑色的背景结合这种动画，有科技感和未来感"
        nextUrl={demoUrlList.hover.SpotlightExample.next}
        reactUrl={demoUrlList.hover.SpotlightExample.react}
        vueUrl={demoUrlList.hover.SpotlightExample.vue}
      >
        聚光格子背景
      </H2>
      <div className="flex justify-center">
        <App />
      </div>
    </div>
  );
}
