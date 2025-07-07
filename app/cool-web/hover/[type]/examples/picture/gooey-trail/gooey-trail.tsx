'use client';
import React from 'react';
import { H2 } from '@/_components/typography';
import { PixelTrail } from './pixel-trail';
import { useScreenSize } from './use-screen-size';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * hover 类的一定是要有记录在容器相对位置的数据结构
 * 时间监测，例如过了 100ms 就添加一个图片，但注意鼠标没有移动的情况下，就不添加图片
 * 添加的图片本身使用gsap的 timeline 或者 framer 的 sequence s来出现，然后离开即可
 */

function App() {
  const screenSize = useScreenSize();
  return (
    <div className="relative w-full h-full min-h-[200px] flex flex-col items-center justify-center gap-8 bg-black text-center text-pretty">
      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

      <div className="absolute inset-0 z-0" style={{ filter: 'url(#gooey-filter-pixel-trail)' }}>
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white"
        />
      </div>

      <p className="text-white text-5xl z-10 w-1/2 font-bold">
        Hover Me
        <span className="font-overusedGrotesk"></span>
      </p>
    </div>
  );
}

const GooeyFilter = ({ id = 'goo-filter', strength = 10 }: any) => {
  return (
    <svg className="absolute">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export function HoverGooeyExample() {
  return (
    <div>
      <H2
        subheading="适合场景：主视觉增强互动性的场景"
        nextUrl={demoUrlList.hover.HoverGooeyExample.next}
        vueUrl={demoUrlList.hover.HoverGooeyExample.vue}
        reactUrl={demoUrlList.hover.HoverGooeyExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-8 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
