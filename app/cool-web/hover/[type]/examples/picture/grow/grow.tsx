'use client';
import { H2 } from '@/_components/typography';
import React from 'react';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * 每个子元素 flex-grow 是 1.同时 flex-basic 是 0，这样每个元素的宽度都是一样的。
 * 然后当 hover 时，每个元素的 flex-grow 是 2，这样每个元素的宽度就是原来的两倍。实现自适应变大效果。
 */
const data = [
  {
    title: '音视频通信',
    desc: '提供坚实的云端一体音视频 PaaS 能力',
    hoverDesc: [
      '✅  20 余年音频领域深厚积淀',
      '✅  依托孟祥云实时音频通信网络，全球互通',
      '✅  全终端 SDK，最快 1 天接入',
    ],
    bg: '/bg-computer.webp',
  },
  {
    title: '游戏云',
    desc: '致力于打造高质量、全方位生态的游戏云服务平台',
    hoverDesc: [
      '✅  20 余年音频领域深厚积淀',
      '✅  依托孟祥云实时音频通信网络，全球互通',
      '✅  全终端 SDK，最快 1 天接入',
    ],
    bg: '/bg-handle.webp',
  },
  {
    title: '低代码平台',
    desc: '高性能低代码开发平台，拖拽式构建小程序及其他应用',
    hoverDesc: [
      '✅  20 余年音频领域深厚积淀',
      '✅  依托孟祥云实时音频通信网络，全球互通',
      '✅  全终端 SDK，最快 1 天接入',
    ],
    bg: '/bg-computer2.webp',
  },
  {
    title: '金融',
    desc: '新基建、新连接、新服务，全面助力行业数字化转型',
    hoverDesc: [
      '✅  20 余年音频领域深厚积淀',
      '✅  依托孟祥云实时音频通信网络，全球互通',
      '✅  全终端 SDK，最快 1 天接入',
    ],
    bg: '/bg-financial.webp',
  },
  {
    title: '制造业',
    desc: '助力制造业实现生产透明化、办公无纸化、车间无人化',
    hoverDesc: [
      '✅  20 余年音频领域深厚积淀',
      '✅  依托孟祥云实时音频通信网络，全球互通',
      '✅  全终端 SDK，最快 1 天接入',
    ],
    bg: '/bg-industrial.webp',
  },
];

function App() {
  return (
    <div className="h-[200px] sm:h-[400px] flex items-center w-full">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="grow cursor-pointer h-[200px] sm:h-[400px] basis-0 transition-all duration-300 ease-in-out hover:grow-[2] border border-solid border-white"
          style={{
            backgroundImage: `url(${data[index].bg})`,
            backgroundSize: 'cover',
            backgroundPosition: '100% 0',
          }}
        >
          <div className="relative flex flex-col p-4 hover:bg-white/60 h-full text-color-50 hover:text-black overflow-hidden group">
            <h2 className="mb-2 sm:text-xl text-[0px] font-medium">{data[index].title}</h2>
            <p className="sm:text-sm text-[0px] absolute top-14 left-4 right-4 duration-100 group-hover:delay-0 delay-200 opacity-100 group-hover:opacity-0">
              {data[index].desc}
            </p>
            <div className="sm:text-sm text-[0px] absolute top-14 left-4 right-4 whitespace-nowrap delay-0 opacity-0 group-hover:opacity-100 overflow-hidden">
              {data[index].hoverDesc.map((item, index) => (
                <p className="mb-2" key={index}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GrowExample() {
  return (
    <div>
      <H2
        subheading="适合场景：未 hover 时展示简要介绍，hover 后展示详细介绍（背景建议有图片）"
        nextUrl={demoUrlList.hover.GrowExample.next}
        vueUrl={demoUrlList.hover.GrowExample.vue}
        reactUrl={demoUrlList.hover.GrowExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-8 flex justify-center bg-color-50 w-full">
        <App />
      </div>
    </div>
  );
}
