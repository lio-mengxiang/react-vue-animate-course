'use client';
import { gsap } from 'gsap';
import React, { useRef, useState, useEffect, JSX, ReactNode } from 'react';
import { H2 } from '@/_components/typography';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';
import { getImageUrl } from '@/_utils';

interface CursorProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  attachToParent?: boolean;
  variants?: {
    initial?: gsap.TweenVars;
    animate?: gsap.TweenVars;
    exit?: gsap.TweenVars;
  };
  transition?: gsap.TweenVars;
  onPositionChange?: (x: number, y: number) => void;
}

/**
 * 鼠标移入 Cursor 父元素，则默认光标消失，并显示 Cursor 中的子元素
 * 让 Cursor 和文字或图片在同一级，这样父元素诗一致的，鼠标就会在同一区域
 */
function Cursor({
  children,
  className = '',
  attachToParent = false,
  variants,
  transition,
  onPositionChange,
  innerClassName = '',
}: CursorProps): JSX.Element {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(!attachToParent);

  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    document.body.style.cursor = attachToParent ? 'auto' : 'none';

    gsap.set(cursorEl, {
      xPercent: -50,
      yPercent: -50,
    });

    const moveCursor = (e: MouseEvent) => {
      const offsetParent = cursorRef.current?.offsetParent;
      const offsetParentRect = offsetParent?.getBoundingClientRect();

      gsap.to(cursorEl, {
        x: e.clientX - (offsetParentRect?.left || 0),
        y: e.clientY - (offsetParentRect?.top || 0),
        duration: 1.8,
        ease: 'power3.out',
      });
      onPositionChange?.(e.clientX, e.clientY);
    };

    cursorEl?.parentElement?.addEventListener('mousemove', moveCursor);
    return () => {
      cursorEl?.parentElement?.removeEventListener('mousemove', moveCursor);
    };
  }, [onPositionChange, attachToParent]);

  useEffect(() => {
    const handleVisibilityChange = (visible: boolean) => {
      setIsVisible(visible);
    };

    const parent = cursorRef.current?.parentElement;

    if (attachToParent && parent) {
      const enter = () => {
        parent.style.cursor = 'none';
        handleVisibilityChange(true);
      };
      const leave = () => {
        parent.style.cursor = 'auto';
        handleVisibilityChange(false);
      };

      parent.addEventListener('mouseenter', enter);
      parent.addEventListener('mouseleave', leave);

      return () => {
        parent.removeEventListener('mouseenter', enter);
        parent.removeEventListener('mouseleave', leave);
      };
    }
  }, [attachToParent]);

  useEffect(() => {
    if (innerRef.current) {
      if (isVisible) {
        if (variants?.initial) gsap.set(innerRef.current, variants.initial);
        gsap.to(innerRef.current, {
          ...variants?.animate,
          ...transition,
        });
      } else {
        gsap.to(innerRef.current, {
          ...variants?.exit,
          ...transition,
        });
      }
    }
  }, [isVisible, variants, transition]);

  return (
    <div ref={cursorRef} className={`pointer-events-none absolute left-0 top-0 z-9999 ${className}`}>
      <div ref={innerRef} className={`${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <div className="flex justify-around items-center flex-col sm:flex-row relative">
      <div className="p-4 sm:mr-12 mr-0">
        <Cursor
          attachToParent
          variants={{
            initial: { height: 0, opacity: 0, scale: 0.3 },
            animate: { height: 'auto', opacity: 1, scale: 1 },
            exit: { height: 0, opacity: 0, scale: 0.3 },
          }}
          transition={{
            ease: 'power2.out',
            duration: 0.3,
          }}
          className="overflow-hidden"
          innerClassName="opacity-0"
        >
          <img src={getImageUrl('/bg-mountion.webp')} alt="Christian Church, Eastern Europe" className="h-40 w-40" />
        </Cursor>
        <span className="font-bold text-5xl mix-blend-difference text-white">WebSite</span>
      </div>
      <div className="overflow-hidden rounded-[12px] bg-white shadow-md dark:bg-black">
        <Cursor
          attachToParent
          variants={{
            initial: { scale: 0.3, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.3, opacity: 0 },
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.15,
          }}
          className="left-12 top-4"
          innerClassName="opacity-0"
        >
          <div className="ml-4 mt-1 rounded-[4px] bg-cyan-500 px-2 py-0.5 text-neutral-50">Welcome</div>
        </Cursor>
        <img src={getImageUrl('/bg-mountion.webp')} alt="Green herbs" className="h-40 w-full max-w-32 object-cover" />
      </div>
    </div>
  );
}

export function CursorExample() {
  return (
    <div>
      <H2
        dataUrl="https://21st.dev/motion-primitives/magnetic/nested"
        subheading="适合场景：补充说明文字和图片表达的信息"
        nextUrl={demoUrlList.hover.CursorExample.next}
        vueUrl={demoUrlList.hover.CursorExample.vue}
        reactUrl={demoUrlList.hover.CursorExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
