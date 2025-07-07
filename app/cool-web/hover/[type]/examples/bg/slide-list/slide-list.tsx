'use client';
import React, { useRef } from 'react';
import { H2 } from '@/_components/typography';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { demoUrlList } from '@/cool-web/demo-list';
import { catalogInfo } from './constants';

/**
 * 如何根据方向来移动 div，首先设置 3 个 div，然后初始状态移动到中间
 * 接着判断鼠标移入时，判断从上面还是下面移入，最后在 y 轴上移动对应距离
 */
const data = [
  {
    name: 'Independent',
    project: 'INNOVATE 2024',
  },
  {
    name: 'Site of the day',
    project: 'LVXH - TMOA',
  },
  {
    name: 'Developer award',
    project: 'The SHOW ROOM',
  },
  {
    name: 'welcome to my web',
    project: '2002 Project',
  },
];

function App() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const awardsOuterList = document.querySelectorAll('.award-outer') as NodeListOf<HTMLElement>;

      awardsOuterList.forEach((element) => {
        element.addEventListener('mouseenter', (e) => {
          if (!(e.target instanceof HTMLElement)) return;
          const targetRect = e.target.getBoundingClientRect();

          const top = e.clientY - targetRect.top;

          const isHoverTop = top < targetRect.height / 2;

          const awardContainer = element.querySelector('.award-container');
          if (isHoverTop) {
            gsap.to(awardContainer, {
              y: '0',
              duration: 0.5,
            });
          } else {
            gsap.to(awardContainer, {
              y: '-6rem',
              duration: 0.5,
            });
          }
        });

        element.addEventListener('mouseleave', (e) => {
          if (!(e.target instanceof HTMLElement)) return;
          const targetRect = e.target.getBoundingClientRect();

          const top = e.clientY - targetRect.top;

          const isHoverTop = top < targetRect.height / 2;

          const awardContainer = element.querySelector('.award-container');

          if (isHoverTop) {
            gsap.to(awardContainer, {
              y: '-3rem',
              duration: 0.5,
            });
          } else {
            gsap.to(awardContainer, {
              y: '-3rem',
              duration: 0.5,
            });
          }
        });
      });
    },
    { scope: containerRef, dependencies: [] },
  );
  return (
    <div>
      <div className="awards" ref={containerRef}>
        {data.map((item, index) => {
          return (
            <div key={index} className="award-outer relative h-12 overflow-hidden uppercase cursor-pointer">
              <div
                className="award-container text-3xl"
                style={{
                  transform: 'translateY(-3rem)',
                }}
              >
                <div className="award flex h-12 text-color-50 bg-color-800 justify-center">
                  <div className="award-name leading-[45px]">{item.project}</div>
                </div>
                <div className="award flex h-12 justify-center border-b border-solid border-color">
                  <div className="award-name leading-[45px]">{item.name}</div>
                </div>
                <div className="award flex h-12 text-color-50 bg-color-800 justify-center">
                  <div className="award-name leading-[45px]">{item.project}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SlideListExample() {
  return (
    <div>
      <H2
        dataUrl="https://www.henriheymans.com/"
        subheading="适合场景：增强文字说明的趣味性"
        nextUrl={demoUrlList.hover.SlideListExample.next}
        vueUrl={demoUrlList.hover.SlideListExample.vue}
        reactUrl={demoUrlList.hover.SlideListExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="flex justify-center">
        <App />
      </div>
    </div>
  );
}
