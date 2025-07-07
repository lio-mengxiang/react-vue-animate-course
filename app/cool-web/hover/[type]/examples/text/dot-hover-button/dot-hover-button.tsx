'use client';

import React from 'react';
import { H2 } from '@/_components/typography';
import { cs } from '@/_utils';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

const IconArrowRightLine = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
};

function App() {
  return <InteractiveHoverButton />;
}

const InteractiveHoverButton = ({ text = 'Button', className, ...props }: { text?: string; className?: string }) => {
  return (
    <button
      className={cs(
        'group relative w-32 cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-center font-semibold',
        className,
      )}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-color-50 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <IconArrowRightLine />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-color-800 transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.2]"></div>
    </button>
  );
};

export function DotHoverButtonExample() {
  return (
    <div>
      <H2
        dataUrl="https://21st.dev/motion-primitives/dock/default"
        subheading="适合场景：表达下一步或者继续的按钮"
        nextUrl={demoUrlList.hover.DotHoverButtonExample.next}
        vueUrl={demoUrlList.hover.DotHoverButtonExample.vue}
        reactUrl={demoUrlList.hover.DotHoverButtonExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
