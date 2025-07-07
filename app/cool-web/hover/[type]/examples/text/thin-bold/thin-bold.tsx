'use client';

import React, { useRef, type JSX } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { H2 } from '@/_components/typography';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * mouse 的 clientX 和 ClientY是针对浏览器窗口的
 *
 */
export default function App(): JSX.Element {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const fontWeightItems = container.current.querySelectorAll('[data-animate="font-weight"]') as NodeListOf<Element>;
      const MAX_DISTANCE = 200;
      const MAX_FONT_WEIGHT = 600;
      const MIN_FONT_WEIGHT = 100;

      const handleMouseMove = (e: MouseEvent) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        fontWeightItems.forEach((item) => {
          const words = item.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;
          words.forEach((word) => {
            const { left, top, width } = word.getBoundingClientRect();
            const itemCenterX = left + width / 2;
            const itemCenterY = top + width / 2;
            const distance = Math.sqrt((mouseX - itemCenterX) ** 2 + (mouseY - itemCenterY) ** 2);

            const fontWeight =
              distance < MAX_DISTANCE
                ? gsap.utils.mapRange(
                    0,
                    MAX_DISTANCE,
                    MIN_FONT_WEIGHT,
                    MAX_FONT_WEIGHT,
                    Math.max(0, MAX_DISTANCE - distance),
                  )
                : MIN_FONT_WEIGHT;

            gsap.to(word, {
              fontWeight,
              duration: 0.5,
              ease: 'power2.out',
            });
          });
        });
      };

      container.current.addEventListener('mousemove', handleMouseMove);

      // 可选：清理事件监听器
      return () => {
        container.current?.removeEventListener('mousemove', handleMouseMove);
      };
    },
    { scope: container },
  );

  return (
    <div ref={container} className="font-thin text-2xl md:text-6xl flex flex-col items-center">
      <div data-animate="font-weight">
        <span>J</span>
        <span>o</span>
        <span>i</span>
        <span>n</span>
        <span> </span>
        <span>U</span>
        <span>s</span>
      </div>
      <div data-animate="font-weight">
        <span>你</span>
        <span>将</span>
        <span>学</span>
        <span>会</span>
        <span>网</span>
        <span>站</span>
        <span>所</span>
        <span>有</span>
        <span>动</span>
        <span>画</span>
        <span>技</span>
        <span>术</span>
      </div>
    </div>
  );
}

export function ThinBoldExample() {
  return (
    <div>
      <H2
        dataUrl="https://21st.dev/motion-primitives/dock/default"
        subheading="适合场景：网站标题特效"
        nextUrl={demoUrlList.hover.ThinBoldExample.next}
        vueUrl={demoUrlList.hover.ThinBoldExample.vue}
        reactUrl={demoUrlList.hover.ThinBoldExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
