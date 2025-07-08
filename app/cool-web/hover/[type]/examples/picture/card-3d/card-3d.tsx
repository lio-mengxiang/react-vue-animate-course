'use client';

import React, { useRef } from 'react';
import { H2 } from '@/_components/typography';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * 计算鼠标跟卡片中心的距离（center.x，center.y），使用老一套 getBoundingClientRect() 方法，中心的话别忘记减去容器 width / 2
 * 相对于卡片中心纵向 y 轴越远，卡片沿 x 轴翻转程度越大
 * 相对于卡片中心横向 x 轴越远，卡片沿 y 轴翻转程度越大，别忘记加 - 号，因为 x 轴越往右，是逆向翻转需要 - 值，y 轴越往下是正向翻转需要 + 值
 *   const rotationX = center.y / 50;
 *   const rotationY = -center.x / 50;
 * 以上是翻转的关系，以下是位移的关系
 *   const shadowOffsetX = -rotationY * 5;
 *   const shadowOffsetY = rotationX * 5;
 * 高光位置的中心就是鼠标坐标
 * gsap.to($card.querySelector('.glare'), {
          autoAlpha: 1,
          backgroundImage: \`
          radial-gradient(
            circle at
            \${center.x + bounds.width / 2}px
            \${center.y + bounds.height / 2}px, rgba(255, 255, 255, 0.33), rgba(0, 0, 0, 0.06)
          )
        \`,
        });
 * 如果要增加 3d 效果的话，需要增加 perspective 和 transformStyle
 */

function App() {
  const container = useRef(null);

  useGSAP(
    () => {
      const $card = document.querySelector('.credit-card');
      if ($card === null) return;
      const bounds = $card.getBoundingClientRect();
      let lastShadowOffsetX = 0;
      let lastShadowOffsetY = 0;
      let lastShadowBlur = 0;

      function moveToMouse(e: MouseEvent) {
        if ($card === null) return;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        // 计算鼠标到卡片中心 x 轴和 y 轴的距离
        const center = {
          x: leftX - bounds.width / 2,
          y: topY - bounds.height / 2,
        };

        // 计算鼠标到卡片中心的距离，用于计算阴影和模糊效果的参数
        const rotationX = center.y / 50;
        const rotationY = -center.x / 50;

        const shadowOffsetX = -rotationY * 5;
        const shadowOffsetY = rotationX * 5;
        const shadowBlur = 20;

        // 保存上一次的阴影和模糊效果参数
        lastShadowOffsetX = shadowOffsetX;
        lastShadowOffsetY = shadowOffsetY;
        lastShadowBlur = shadowBlur;

        gsap.to($card, {
          scale: 1.1,
          rotationX: rotationX,
          rotationY: rotationY,
          transformPerspective: 500,
          ease: 'power2.out',
          boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 4px rgba(72, 65, 56, .2)`,
        });

        gsap.to($card.querySelector('.glare'), {
          autoAlpha: 1,
          backgroundImage: `
          radial-gradient(
            circle at
            ${center.x + bounds.width / 2}px
            ${center.y + bounds.height / 2}px, rgba(255, 255, 255, 0.33), rgba(0, 0, 0, 0.06)
          )
        `,
        });
      }

      $card.addEventListener('mouseenter', () => {
        document.addEventListener('mousemove', moveToMouse);
        gsap.to($card, {
          scale: 1.1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
        });
      });

      $card.addEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', moveToMouse);

        // Animate the card back to its original state
        gsap.to($card, {
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: 'power2.out',
        });

        // Animate the shadow back to the center and fade out
        gsap.fromTo(
          $card,
          {
            boxShadow: `${lastShadowOffsetX}px ${lastShadowOffsetY}px ${lastShadowBlur}px 4px rgba(72, 65, 56, .2)`,
            duration: 0.3,
            ease: 'power3.out',
          },
          {
            boxShadow: `0px 0px 0px 4px rgba(0, 0, 0, 0)`,
            duration: 0.8,
          },
        );

        // Fade out the glare background image
        gsap.to($card.querySelector('.glare'), {
          autoAlpha: 0,
          duration: 0.6,
        });
      });
    },
    { scope: container, dependencies: [] },
  );

  return (
    <div
      className="credit-card relative p-6 w-60 h-60 rounded-xl overflow-hidden bg-cover"
      ref={container}
      style={{
        background: `${process.env.isGithubPage ? `bg-[url(${process.env.isGithubPage}/animation-home/react.webp)` : 'bg-[url(/animation-home/react.webp)]'}`,
      }}
    >
      <div className="glare absolute w-full h-full left-0 top-0"></div>
    </div>
  );
}
export function Card3dExample() {
  return (
    <div>
      <H2
        subheading="适合场景：图片或者卡片酷炫展示"
        nextUrl={demoUrlList.hover.Card3dExample.next}
        reactUrl={demoUrlList.hover.Card3dExample.react}
        vueUrl={demoUrlList.hover.Card3dExample.vue}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
