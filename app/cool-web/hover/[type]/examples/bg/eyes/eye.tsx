'use client';
import React, { useRef } from 'react';
import { H2 } from '@/_components/typography';
import './index.css';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { getAngleDom } from '@/_utils';
import { demoUrlList } from '@/cool-web/demo-list';
import { catalogInfo } from './constants';

/**
 * 计算鼠标每个眼睛中心的角度
 * const rad = Math.atan2(event.clientY - y, event.clientX - x);
 * const rot = rad * (180 / Math.PI) + 180;
 * 然后眼睛转动到对应角度即可
 * gsap.to(eye, {
 *   rotate: rot + '_short',
 * });
 */
function App() {
  const container = useRef(null);

  useGSAP(
    () => {
      document.addEventListener('mousemove', (event) => {
        const eyes = document.querySelectorAll('.eye-outer');
        eyes.forEach((eye) => {
          const rot = getAngleDom(eye as HTMLDivElement, { x: event.clientX, y: event.clientY });

          gsap.to(eye, {
            rotate: rot + '_short',
          });
        });
      });
    },
    { scope: container },
  );

  return (
    <div className="w-full h-80 flex items-center justify-center bg-lime-300" ref={container}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="eye-outer">
          <div className="eye-inner"></div>
        </div>
        <div className="eye-outer">
          <div className="eye-inner"></div>
        </div>
      </div>
    </div>
  );
}
export function EyeExample() {
  return (
    <div>
      <H2
        subheading="适合场景：增加有趣的互动效果时，可以使用"
        nextUrl={demoUrlList.hover.EyeExample.next}
        reactUrl={demoUrlList.hover.EyeExample.react}
        vueUrl={demoUrlList.hover.EyeExample.vue}
      >
        {catalogInfo.text}
      </H2>
      <div className="flex justify-center">
        <App />
      </div>
    </div>
  );
}
