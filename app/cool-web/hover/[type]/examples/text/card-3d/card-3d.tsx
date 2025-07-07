'use client';
import React from 'react';
import { H2 } from '@/_components/typography';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * 外层的 div 旋转 180deg，里面的卡片背面需要翻转，并注意： backfaceVisibility: 'hidden'
 */
function App() {
  return (
    <div className="flex">
      <div className="font-sans relative w-40 h-48 rounded-xl [perspective:1000px] cursor-pointer group mr-12">
        {/* 卡片背面内容 */}
        <div className="absolute w-full h-full p-4 bg-white border border-gray-200 rounded-xl flex flex-col justify-between shadow-md transition-all duration-500">
          <div>
            <h3 className="text-blue-500 text-sm font-semibold uppercase mb-2">Overview</h3>
          </div>
        </div>

        {/* 漏出的提示卡片 */}
        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 p-2 bg-[radial-gradient(circle,_#e0f2ff_0%,_#cfe9ff_100%)] border border-blue-100 rounded-lg transition-all duration-500 group-hover:translate-x-[40px] group-hover:rotate-[20deg] shadow-lg backdrop-blur-sm">
          <p className="text-blue-700 text-xs text-center">Tap to read</p>
        </div>

        {/* 卡片封面 */}
        <div className="absolute w-full h-full px-6 pt-5 pb-6 bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-lg text-gray-800 origin-top-left transition-all duration-500 group-hover:[transform:rotateY(-40deg)] shadow-xl">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-lg font-bold leading-tight">Light UI</h2>
              <p className="text-xs text-gray-500 mt-1">A modern book</p>
            </div>
            <div className="text-xs text-gray-400">Hover →</div>
          </div>
        </div>
      </div>
      <div className="font-sans relative w-40 h-48 rounded-xl [perspective:1000px] cursor-pointer group">
        <div
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full transition-all duration-1000 group-hover:[transform:rotateY(180deg)]"
        >
          {/* 卡片封面 */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute w-full h-full px-6 pt-5 pb-6 bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-lg text-gray-800 shadow-xl"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-lg font-bold leading-tight">Light UI</h2>
                <p className="text-xs text-gray-500 mt-1">A modern book</p>
              </div>
              <div className="text-xs text-gray-400">Hover →</div>
            </div>
          </div>
          {/* 漏出的提示卡片 */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute w-full h-full [transform:rotateY(180deg)] p-2 bg-[radial-gradient(circle,_#e0f2ff_0%,_#cfe9ff_100%)] border border-blue-100 rounded-lg flex justify-center items-center"
          >
            <p className="text-blue-700 text-center">Welcome!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Card3DExample() {
  return (
    <div>
      <H2
        subheading="适合场景：增强卡片交互性场景"
        nextUrl={demoUrlList.hover.Card3DExample.next}
        vueUrl={demoUrlList.hover.Card3DExample.vue}
        reactUrl={demoUrlList.hover.Card3DExample.react}
      >
        3D 翻转动画
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
