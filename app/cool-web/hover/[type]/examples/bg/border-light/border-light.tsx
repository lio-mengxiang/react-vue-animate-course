'use client';
import React, { useEffect } from 'react';
import { H2 } from '@/_components/typography';
import { cs } from '@/_utils';
import { demoUrlList } from '@/cool-web/demo-list';
import { catalogInfo } from './constants';

function App() {
  useEffect(() => {
    const cards = document.querySelectorAll('.b-card') as NodeListOf<HTMLElement>;

    cards.forEach((card: HTMLElement) => {
      card.onmousemove = function (e) {
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      };
    });
  }, []);

  const colors = ['#0f0', '#ff0', '#f00', '#f0f', '#0ff'];

  return (
    <div className="relative grid grid-cols-[repeat(4,60px)] gap-2 p-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className={cs(
            `b-card relative w-[60px] h-[60px] overflow-hidden bg-[#2d2d2d]`,
            `after:content-[''] after:absolute after:inset-[2px] after:bg-[rgba(45,45,45,0.9)]`,
            `before:content-[''] before:absolute before:w-[80px] before:h-[80px]
            before:top-[var(--y)] before:left-[var(--x)] before:translate-x-[-50%] before:translate-y-[-50%]
            before:bg-[radial-gradient(var(--clr),transparent,transparent)]
            before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500`,
          )}
          // @ts-ignore
          style={{ '--clr': colors[i % colors.length] }}
        ></div>
      ))}
    </div>
  );
}

export function BorderLightExample() {
  return (
    <div>
      <H2
        subheading="适合场景：更适合暗黑主题，需要表现炫光的场景"
        nextUrl={demoUrlList.hover.BorderLightExample.next}
        reactUrl={demoUrlList.hover.BorderLightExample.react}
        vueUrl={demoUrlList.hover.BorderLightExample.vue}
      >
        {catalogInfo.text}
      </H2>
      <div className="flex justify-center bg-[#131313] rounded-lg">
        <App />
      </div>
    </div>
  );
}
