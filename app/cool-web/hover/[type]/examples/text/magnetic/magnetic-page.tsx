'use client';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { H2 } from '@/_components/typography';
import { gsap } from 'gsap';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

function App() {
  return (
    <div className="flex">
      <Magnetic intensity={0.2} actionArea="global" range={200}>
        <button
          type="button"
          className="inline-flex items-center rounded-lg border border-zinc-100 bg-zinc-100 px-4 py-2 text-sm text-zinc-950 transition-all duration-200 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600"
        >
          <Magnetic intensity={0.1} actionArea="global" range={200}>
            <span>磁 铁 🧲</span>
          </Magnetic>
        </button>
      </Magnetic>
    </div>
  );
}

interface MagneticProps {
  children: ReactNode;
  intensity?: number;
  range?: number;
  actionArea?: 'self' | 'parent' | 'global';
}

function Magnetic({ children, intensity = 0.6, range = 100, actionArea = 'self' }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const anim = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const calculateDistance = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (isHovered && distance <= range) {
        // 这个值 scale 是一个 0 到 1 之间的比例，决定元素对鼠标靠近的“响应程度”：
        // 当鼠标靠得很近，distance 趋近于 0 → scale ≈ 1（最大吸力，跟随最强）
        // 当鼠标远到刚好超出作用范围，distance ≈ range → scale ≈ 0（没有吸力，不动）
        const scale = 1 - distance / range;
        const offsetX = distanceX * intensity * scale;
        const offsetY = distanceY * intensity * scale;

        animateTo(offsetX, offsetY);
      } else {
        animateTo(0, 0);
      }
    };

    document.addEventListener('mousemove', calculateDistance);
    return () => {
      document.removeEventListener('mousemove', calculateDistance);
    };
  }, [isHovered, intensity, range]);

  const animateTo = (x: number, y: number) => {
    if (!ref.current) return;

    anim.current = gsap.to(ref.current, {
      x,
      y,
      ease: 'power3.out',
      duration: 0.4,
    });
  };

  useEffect(() => {
    if (actionArea === 'parent' && ref.current?.parentElement) {
      const parent = ref.current.parentElement;
      const handleEnter = () => setIsHovered(true);
      const handleLeave = () => setIsHovered(false);

      parent.addEventListener('mouseenter', handleEnter);
      parent.addEventListener('mouseleave', handleLeave);

      return () => {
        parent.removeEventListener('mouseenter', handleEnter);
        parent.removeEventListener('mouseleave', handleLeave);
      };
    } else if (actionArea === 'global') {
      setIsHovered(true);
    }
  }, [actionArea]);

  const handleMouseEnter = () => {
    if (actionArea === 'self') setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (actionArea === 'self') {
      setIsHovered(false);
      animateTo(0, 0);
    }
  };

  return (
    <div ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}

export function MagneticNestedExample() {
  return (
    <div>
      <H2
        subheading="适合场景：给文字增加特效，增强网站趣味性"
        nextUrl={demoUrlList.hover.MagneticNestedExample.next}
        vueUrl={demoUrlList.hover.MagneticNestedExample.vue}
        reactUrl={demoUrlList.hover.MagneticNestedExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
