'use client';
import React from 'react';
import './index.css';
import { H2 } from '@/_components/typography';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * 背景的移动，本质就是 absolute 定位，然后移动到不同 dom 元素时，计算出宽高和 left、top (背景颜色块和背景都是相对于容器定位的，所以使用 getBoundingClientRect 那一套计算背景在容器的相对距离即可)
 */
function App() {
  return (
    <div className="flex justify-center items-end gap-12 py-12">
      {[
        {
          cover: '/image-card/dark_rider-cover.webp',
          title: '/image-card/dark_rider-title.webp',
          character: '/image-card/dark_rider-character.webp',
        },
      ].map((item, index) => (
        <div
          key={index}
          className="relative flex justify-center items-end px-9 [perspective:2500px] w-[200px] h-[300px] group"
        >
          {/* Cover Wrapper */}
          <div className="absolute inset-0 transition-all duration-500 z-[-1] group-hover:[transform:perspective(900px)_translateY(-5%)_rotateX(25deg)_translateZ(0)] group-hover:shadow-[2px_35px_32px_-8px_rgba(0,0,0,0.75)] before:rounded-lg before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/90 before:via-black/50 before:to-transparent before:opacity-0 group-hover:before:opacity-100 rounded-lg">
            <img src={item.cover} className="w-full h-full object-cover rounded-lg" alt="cover" />
          </div>

          {/* Title */}
          <img
            src={item.title}
            className="w-full transition-transform duration-500 group-hover:translate-y-[-50px] group-hover:translate-z-[100px]"
            alt="title"
          />

          {/* Character */}
          <img
            src={item.character}
            className="w-full absolute z-[-1] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-[-30%] group-hover:translate-z-[100px] rounded-lg"
            alt="character"
          />
        </div>
      ))}
    </div>
  );
}

export function ImageExample() {
  return (
    <div>
      <H2
        subheading="适合场景：增强图片表现力的场景"
        nextUrl={demoUrlList.hover.ImageExample.next}
        vueUrl={demoUrlList.hover.ImageExample.vue}
        reactUrl={demoUrlList.hover.ImageExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-8 flex justify-center bg-color-50 w-full">
        <App />
      </div>
    </div>
  );
}
