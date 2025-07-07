'use client';
import React, { useEffect, useRef } from 'react';
import { H2 } from '@/_components/typography';
import { getAngleDom } from '@/_utils';
import { demoUrlList } from '@/cool-web/demo-list';

function App() {
  return (
    <MagnetLines
      rows={9}
      columns={9}
      containerSize="200px"
      lineColor="tomato"
      lineWidth="2px"
      lineHeight="16px"
      baseAngle={0}
      style={{ margin: '2rem auto' }}
    />
  );
}

function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {},
}: any) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('span');

    const onPointerMove = (pointer: any) => {
      items.forEach((item) => {
        item.style.setProperty('--rotate', `${getAngleDom(item, pointer)}deg`);
      });
    };

    window.addEventListener('pointermove', onPointerMove);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center"
      style={{
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        // @ts-expect-error CSS custom property '--rotate' is not recognized by TypeScript
        '--rotate': `${baseAngle}deg`,
        transform: 'rotate(var(--rotate))',
        willChange: 'transform',
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style,
      }}
    >
      {spans}
    </div>
  );
}

export function MagnetLineExample() {
  return (
    <div>
      <H2
        dataUrl="https://21st.dev/DavidHDev/magnet-lines/default"
        subheading="适合场景：需要增加互动性和趣味性的页面"
        reactUrl={demoUrlList.hover.MagnetLineExample.react}
        vueUrl={demoUrlList.hover.MagnetLineExample.vue}
        nextUrl={demoUrlList.hover.MagnetLineExample.next}
      >
        磁铁线条
      </H2>
      <div className="py-8 flex justify-center bg-color-50 flex-col">
        <App />
      </div>
    </div>
  );
}
