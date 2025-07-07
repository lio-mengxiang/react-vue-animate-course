'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export type MagneticProps = {
  children: React.ReactNode;
  intensity?: number;
  range?: number;
  actionArea?: 'self' | 'parent' | 'global';
  springOptions?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
};

export function Magnetic({ children, intensity = 0.6, range = 100, actionArea = 'self' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
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
        //   缩放比例计算 scale = 1 - distance / range ：
        // - 当距离为0时： scale = 1 - 0/100 = 1 （最大效果）
        // - 当距离为50时： scale = 1 - 50/100 = 0.5 （中等效果）
        // - 当距离为100时： scale = 1 - 100/100 = 0 （无效果）
        const scale = 1 - distance / range;
        // - 距离越近，偏移量越大
        // - 距离越远，偏移量越小
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

    anim.current?.kill();
    anim.current = gsap.to(ref.current, {
      x,
      y,
      ease: 'power3.out',
      duration: 0.4, // approximate spring feel
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
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
