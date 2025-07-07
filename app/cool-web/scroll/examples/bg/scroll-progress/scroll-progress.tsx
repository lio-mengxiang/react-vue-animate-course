'use client';
import React from 'react';
import { CodePreview } from '@/_components/code-preview';
import { H2 } from '@/_components/typography';

const code = `"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useElementScroll } from './useElementScroll';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  return (
    <div>
      {/* 大量内容模拟滚动区域 */}
      <ScrollContainerProgressBar containerRef={containerRef} />
      <div className="mt-4 space-y-10 relative h-44 overflow-y-auto" ref={containerRef}>
        <h1 className="text-2xl font-bold">当你在此容器滚动，会出现滚动进度提示</h1>
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i} className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis felis ut orci suscipit, sed
            scelerisque sapien feugiat. Pellentesque habitant morbi tristique senectus et netus et.
          </p>
        ))}
      </div>
    </div>
  );
}

function ScrollContainerProgressBar({ containerRef }) {
  const [scroll] = useElementScroll(containerRef);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!progressRef.current || !containerRef?.current) return;

    const container = containerRef.current;

    const updateProgress = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      gsap.to(progressRef.current, {
        width: \`\${progress * 100}%\`,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    updateProgress();
  }, [scroll]);

  return (
    <div
      style={{
        position: 'sticky', // 不再固定在窗口
        top: 0,
        left: 0,
        height: '4px',
        background: '#949494',
        borderRadius: '2px',
        width: '0%',
        zIndex: 9999,
      }}
      ref={progressRef}
    />
  );
};`;

export function ScrollProgressExample() {
  return (
    <div>
      <H2 subheading="适合场景：背景动画增强文字的吸引力">滚动进度</H2>
      <CodePreview code={code} demoContainerClassName="pt-10 pb-16 flex justify-center bg-color-50" />
    </div>
  );
}
