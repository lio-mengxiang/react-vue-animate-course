'use client';

import React, { type MouseEvent, ReactNode, useRef, useState } from 'react';
import { H2 } from '@/_components/typography';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';
import { getImageUrl } from '@/_utils';

/**
 * 典型的坐标映射，如果想加上效果使用useMotionValue => useSpring
 */
function App() {
  return (
    <div className="p-10 flex gap-1 font-medium text-xl">
      Hello, try to hover {'->'}
      <HoverLinkPreview href="#" previewImage="/animation-home/motion.webp" imageAlt="Example preview">
        Image
      </HoverLinkPreview>
    </div>
  );
}

interface HoverLinkPreviewProps {
  href: string;
  previewImage: string;
  imageAlt?: string;
  children: ReactNode;
}

const HoverLinkPreview = ({ href, previewImage, imageAlt = 'Link preview', children }: HoverLinkPreviewProps) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const prevX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Motion values for smooth animation
  const motionTop = useMotionValue(0);
  const motionLeft = useMotionValue(0);
  const motionRotate = useMotionValue(0);

  // Springs for natural movement
  const springTop = useSpring(motionTop, { stiffness: 300, damping: 30 });
  const springLeft = useSpring(motionLeft, { stiffness: 300, damping: 30 });
  const springRotate = useSpring(motionRotate, { stiffness: 300, damping: 20 });

  // Handlers
  const handleMouseEnter = () => {
    setShowPreview(true);
    prevX.current = null;
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
    prevX.current = null;
    motionRotate.set(0);
  };

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const PREVIEW_WIDTH = 80;
    const PREVIEW_HEIGHT = 80;
    const OFFSET_Y = 20;

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    motionTop.set(e.clientY - containerRect.top - PREVIEW_HEIGHT - OFFSET_Y);
    motionLeft.set(e.clientX - containerRect.left - PREVIEW_WIDTH / 2);

    if (prevX.current !== null) {
      const deltaX = e.clientX - prevX.current;
      const newRotate = Math.max(-15, Math.min(15, deltaX * 1.2));
      motionRotate.set(newRotate);
    }
    prevX.current = e.clientX;
  };

  return (
    <div ref={containerRef} className="relative">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-block cursor-pointer text-blue-600 underline"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {children}
      </a>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10, rotate: 0 }}
            style={{
              position: 'absolute',
              top: springTop,
              left: springLeft,
              rotate: springRotate,
              zIndex: 50,
              pointerEvents: 'none',
            }}
          >
            <div className="bg-white border rounded-2xl shadow-lg p-2 w-24 h-24">
              <img
                src={getImageUrl(previewImage)}
                alt={imageAlt}
                draggable={false}
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export function HoverPreviewExample() {
  return (
    <div>
      <H2
        dataUrl="https://21st.dev/preetsuthar17/hover-link-preview/default"
        subheading="适合场景：网站标题特效"
        nextUrl={demoUrlList.hover.HoverPreviewExample.next}
        vueUrl={demoUrlList.hover.HoverPreviewExample.vue}
        reactUrl={demoUrlList.hover.HoverPreviewExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
