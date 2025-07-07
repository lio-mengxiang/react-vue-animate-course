'use client';
import React, { ElementType, JSX } from 'react';
import { motion } from 'motion/react';
import { H2 } from '@/_components/typography';
import { cs } from '@/_utils';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

interface TextShimmerWaveProps {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  zDistance?: number;
  xDistance?: number;
  yDistance?: number;
  spread?: number;
  transition?: {
    [key: string]: any;
  };
}

function TextShimmerWave({
  children,
  as: Component = 'p',
  className,
  duration = 1,
  zDistance = 10,
  xDistance = 2,
  yDistance = -2,
  spread = 1,
  transition,
}: TextShimmerWaveProps) {
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      className={cs(
        'relative inline-block [perspective:500px]',
        '[--base-color:#a1a1aa] [--base-gradient-color:#000]',
        'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]',
        className,
      )}
      style={{ color: 'var(--base-color)' }}
      whileHover="hover"
    >
      {children.split('').map((char, i) => {
        // 计算 第 i 个子元素的动画延迟时间，使得整体动画在视觉上实现一个有节奏地“波动”或“波浪”效果
        const delay = (i * duration * (1 / spread)) / children.length;

        return (
          <motion.span
            key={i}
            className={cs('inline-block whitespace-pre [transform-style:preserve-3d]')}
            variants={{
              hover: {
                translateZ: [0, zDistance, 0],
                translateX: [0, xDistance, 0],
                translateY: [0, yDistance, 0],
                color: ['var(--base-color)', 'var(--base-gradient-color)', 'var(--base-color)'],
                transition: {
                  duration,
                  delay,
                  ease: 'easeInOut',
                  ...transition,
                },
              },
            }}
            initial={{
              translateZ: 0,
              translateX: 0,
              translateY: 0,
              color: 'var(--base-color)',
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
}

// App Component
function App(): JSX.Element {
  return (
    <TextShimmerWave
      className="[--base-color:#0D74CE] [--base-gradient-color:#5EB1EF]"
      duration={1}
      spread={1}
      zDistance={1}
    >
      Hover 文字出现水波的效果
    </TextShimmerWave>
  );
}

export function LiquidTextExample() {
  return (
    <div>
      <H2
        subheading="适合场景：增强文字表现力"
        nextUrl={demoUrlList.hover.LiquidTextExample.next}
        vueUrl={demoUrlList.hover.LiquidTextExample.vue}
        reactUrl={demoUrlList.hover.LiquidTextExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
