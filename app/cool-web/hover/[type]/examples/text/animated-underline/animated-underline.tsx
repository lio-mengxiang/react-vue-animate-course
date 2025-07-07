'use client';
import React from 'react';
import { H2 } from '@/_components/typography';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * 核心是上层的 dom mix-blend-difference
 */
function App() {
  return (
    <div className="relative after:absolute after:bg-primary after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
      <span className="text-primary">Hover Me</span>
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
        underline
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
