'use client';
import React from 'react';
import { CodePreview } from '@/_components/code-preview';
import { H2 } from '@/_components/typography';

const code = `"use client";
import React from "react";
import { gsap } from "gsap";

function App() {
  return (
    <RippleText />
  );
}

function RippleText() {
  const turbulenceRef = useRef(null);
  const displacementRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // 初始化 baseFrequency 和 scale
    gsap.set(turbulenceRef.current, { attr: { baseFrequency: 0.01 } });
    gsap.set(displacementRef.current, { attr: { scale: 0 } });
  }, []);

  const handleMouseMove = (e) => {
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const width = bounds.width;
    const height = bounds.height;

    // 计算鼠标位置的比例（中心位置越靠近，扰动越强）
    const dx = Math.abs(x - width / 2) / (width / 2);
    const dy = Math.abs(y - height / 2) / (height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const intensity = 1 - Math.min(distance, 1);

    const frequency = 0.01 + intensity * 0.05;
    const scale = intensity * 10;

    gsap.to(turbulenceRef.current, {
      attr: { baseFrequency: frequency * 0.4 },
      duration: 1,
      ease: 'power2.out',
    });

    gsap.to(displacementRef.current, {
      attr: { scale },
      duration: 1,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    // 鼠标离开，回归初始状态
    gsap.to(turbulenceRef.current, {
      attr: { baseFrequency: 0.01 },
      duration: 0.5,
    });
    gsap.to(displacementRef.current, {
      attr: { scale: 0 },
      duration: 0.5,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-[200px] flex items-center justify-center"
    >
      <svg viewBox="0 0 600 200" width="100%" height="100%">
        <defs>
          <filter id="rippleTextFilter">
            {/* 更多关于 type https://www.zhangxinxu.com/study/202008/svg-feturbulence-turbulence-fractalnoise-demo.php */}
            {/* baseFrequency 越大，噪声越密集，对于我们水波效果，baseFrequency 最好小一点 */}
            {/* numOctaves 越大，块越明显，对于我们水波效果，numOctaves 最好小一点 */}
            {/* seed 是一个随机数，用于生成不同的噪声 */}
            <feTurbulence ref={turbulenceRef} type="fractalNoise" baseFrequency="0.01" numOctaves="1" seed="2" result="turbulence" />
            <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="turbulence" scale="0" />
          </filter>
        </defs>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="48"
          fontWeight="bold"
          filter="url(#rippleTextFilter)"
          fill="#333"
        >
          Water Ripple Text
        </text>
      </svg>
    </div>
  );
}`;

export function LiquidTextExample() {
  return (
    <div>
      <H2 subheading="适合场景：未 hover 时展示简要介绍，hover 后展示详细介绍（背景建议有图片）">水波文字</H2>
      <CodePreview code={code} demoContainerClassName="bg-color-50 flex justify-center py-12" />
    </div>
  );
}
