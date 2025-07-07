'use client';

import React, { useContext, createContext, useRef } from 'react';
import { H2 } from '@/_components/typography';
import {
  IconAppleLine,
  IconChromeLine,
  IconFaceBookLine,
  IconTwitterLine,
  IconYoutubeLine,
} from '@t-headless-ui/react';
import { useMotionValue, motion, useTransform, useSpring } from 'motion/react';
import { demoUrlList } from '@/cool-web/demo-list';
import { catalogInfo } from './constants';

/**
 * 容器内的坐标跟每个元素中心坐标的差值 -> 目标是差值越大，宽高越大 -> 所以距离要映射为宽度，但这个距离我们有 distance 的限制，不会无限大 -> 所以要映射为一个范围
 *   const mouseDistance = useTransform(mouseX, (val) => {
 *   const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
 *   return val - domRect.x - domRect.width / 2;
 *   });
 *  useTransform(mouseDistance, [-distance, 0, distance], [40, magnification, 40])
 */
const data = [IconAppleLine, IconChromeLine, IconFaceBookLine, IconTwitterLine, IconYoutubeLine];

const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 150;
const DEFAULT_PANEL_HEIGHT = 56;

const DockContext = createContext(undefined);

function DockProvider({ children, value }: any) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('useDock must be used within an DockProvider');
  }
  return context;
}

/**
 *
 * spring 动画配置对象，用于 framer-motion 的 useSpring
 * magnification 当鼠标靠近 DockItem 时，它的最大放大宽度。例如，正常宽度是 40，放大后会达到 80
 * distance 影响鼠标距离图标多远开始放大。超过这个距离就不会放大。
 * panelHeight Dock 整体容器的高度，控制整个工具栏的高度
 * https://emilkowal.ski/ui/great-animations#great-animations-feel-natural
 * mass：控制到达终点回弹成都
 * stiffness：速度快慢
 * damping: 值越大，回弹很多
 */
function Dock({
  children,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: any) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      style={{
        height: magnification + magnification / 2 + 4,
        scrollbarWidth: 'none',
      }}
      className="flex max-w-full items-end overflow-x-auto"
    >
      <motion.div
        onMouseMove={({ clientX }) => {
          mouseX.set(clientX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        className="mx-auto flex w-fit gap-4 rounded-2xl bg-gray-50 px-4 py-2 items-end"
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ mouseX, spring, distance, magnification }}>{children}</DockProvider>
      </motion.div>
    </motion.div>
  );
}

function DockItem({ children }: any) {
  const ref = useRef<HTMLDivElement>(null);

  const { distance, magnification, mouseX, spring } = useDock();

  const mouseDistance = useTransform(mouseX, (val: number) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - domRect.x - domRect.width / 2;
  });

  // 距离映射为宽度
  const widthTransform = useTransform(mouseDistance, [-distance, 0, distance], [40, magnification, 40]);

  const width = useSpring(widthTransform, spring);

  const widthTransform2 = useTransform(width, (val) => val / 2);

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className="relative inline-flex items-center justify-center aspect-square rounded-full bg-gray-200 dark:bg-neutral-800"
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      <motion.div style={{ width: widthTransform2 }} className="text-neutral-600">
        {children}
      </motion.div>
    </motion.div>
  );
}

function App() {
  return (
    <div className="h-20 flex items-end size-full justify-center">
      <Dock className="items-end pb-3">
        {data.map((Item, idx) => (
          <DockItem key={idx} className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800">
            <Item width="100%" height="100%" />
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}

export function DockMenuExample() {
  return (
    <div>
      <H2
        dataUrl="https://21st.dev/motion-primitives/dock/default"
        subheading="适合场景：酷炫的 menu icon 效果"
        nextUrl={demoUrlList.hover.DockMenuExample.next}
        vueUrl={demoUrlList.hover.DockMenuExample.vue}
        reactUrl={demoUrlList.hover.DockMenuExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-8 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
