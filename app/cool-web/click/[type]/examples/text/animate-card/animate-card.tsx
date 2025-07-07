'use client';

import React from 'react';
import { H2 } from '@/_components/typography';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * 核心是上层的 dom mix-blend-difference
 */
function App() {
  return (
    <div className="flex justify-center items-center">
      <div className="group w-[540px] h-[340px] overflow-hidden">
        <div className="relative w-full h-full bg-white text-black transition-all duration-200 ease-out group-hover:bg-black group-hover:text-white">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[50px] z-10">
            Hover Me
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 w-[260px] h-[260px] rounded-full bg-white transition-transform duration-300 group-hover:scale-100"></div>
          <div className="absolute top-1/2 left-[-20%] transform -translate-y-1/2 text-[40px] uppercase whitespace-nowrap py-5 z-20 mix-blend-difference opacity-0 text-white group-hover:opacity-100 animate-floatLeft">
            Hello &mdash; Hello &mdash; Hello &mdash; Hello &mdash; Hello &mdash; Hello &mdash;
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnimateCardExample() {
  return (
    <div>
      <H2
        subheading="适合场景：补充文字信息"
        nextUrl={demoUrlList.hover.AnimateCardExample.next}
        vueUrl={demoUrlList.hover.AnimateCardExample.vue}
        reactUrl={demoUrlList.hover.AnimateCardExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
