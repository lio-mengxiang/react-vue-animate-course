'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { H2 } from '@/_components/typography';
import { catalogInfo } from './constants';
import { bgUrl } from './bg';
import { demoUrlList } from '@/cool-web/demo-list';

// 建议忽略代码细节，直接通过下面的 config 快速更新效果
// 例如 demo 文字是 T-Headless-UI，那么就可以通过修改 text 属性来更改文字
interface Config {
  text: string;
  fontWeight: number;
}

const config: Config = {
  text: 'Welcome',
  fontWeight: 1000,
};

function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<SVGGElement | null>(null);
  const BALL_COUNT = 4;
  const BALL_LIFETIME = 1.2; // seconds

  const createBalls = (x: number, y: number) => {
    if (!wrapperRef.current) return;

    Array.from({ length: BALL_COUNT }).forEach(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 50 + 10;
      const radius = Math.random() * 4 + 3;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('fill', 'black');
      circle.setAttribute('r', radius.toString());
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());

      wrapperRef.current!.appendChild(circle);

      // 气泡从 radius 变为
      gsap.to(circle, {
        duration: BALL_LIFETIME,
        attr: {
          cx: x + dx,
          cy: y + dy,
          r: 0,
        },
        ease: 'none',
        onComplete: () => {
          circle.remove();
        },
      });
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createBalls(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      className="relative pointer-events-none"
    >
      <mask id="s-hero-finish-code">
        <text
          x="50%"
          y="50%"
          fill="white"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-7xl md:text-9xl"
          fontWeight={config.fontWeight}
          fontFamily="impact"
        >
          {config.text}
        </text>
      </mask>

      <filter id="s-hero-finish-gooey">
        <feImage result="texture" href={`${bgUrl}`} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 50 -10"
          result="goo"
        />
        <feComposite in="texture" in2="goo" operator="in" />
      </filter>

      <rect x="0" y="0" width="100%" height="100%" fill="#fff" mask="url(#s-hero-finish-code)" />
      <g filter="url(#s-hero-finish-gooey)" mask="url(#s-hero-finish-code)" className="js-wrapper" ref={wrapperRef} />
    </svg>
  );
}

export function SvgGooeyExample() {
  return (
    <div>
      <H2
        dataUrl="https://www.awwwards.com/inspiration/texture-hover-reveal-duten"
        subheading="适合场景：1、文字作为网页某一屏的主体，增强交互感 2、用于特定产品，增强产品吸引力，例如介绍果汁时，为了贴合产品特性，将颜色修改为果汁颜色"
        nextUrl={demoUrlList.hover.SvgGooeyExample.next}
        vueUrl={demoUrlList.hover.SvgGooeyExample.vue}
        reactUrl={demoUrlList.hover.SvgGooeyExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-200">
        <App />
      </div>
    </div>
  );
}
