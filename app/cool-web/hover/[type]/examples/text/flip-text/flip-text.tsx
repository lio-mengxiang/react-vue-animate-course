'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { H2 } from '@/_components/typography';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * 第一排所有字母分词 标记每个字母 class 为 line1
 * 第二排所有字母分词 标记每个字母 class 为 line2
 * 当 hover 时，line1 字母逐个向上，line2 字母逐个向上
 */
function App() {
  return <Button word="欢迎加入前端动画俱乐部" stagger={0.02} />;
}

// Button组件类型
interface ButtonProps {
  word: string;
  stagger: number;
}

// Words组件类型
interface WordsProps {
  words: string[];
  className: string;
  lineIndex: number;
}

// TextHoverFlip组件类型
interface TextHoverFlipProps {
  words: string[];
  textOneClassName?: string;
  textTwoClassName?: string;
  isHover: boolean;
  stagger: number;
  duration?: number;
}

// Button 组件
function Button({ word, stagger }: ButtonProps) {
  const [isHover, setIsHover] = useState(false);
  // 分割词语为字符数组，用于 TextHoverFlip 组件的 word
  const words = React.useMemo(() => splitStringIntoChars(word), [word]);

  return (
    <div className="cursor-pointer" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <TextHoverFlip words={words} isHover={isHover} stagger={stagger} />
    </div>
  );
}

// Words 组件
function Words({ words, className, lineIndex }: WordsProps) {
  return (
    <div className="flex">
      {words.map((word, index) => (
        <span key={index} className={`${className} line${lineIndex}`}>
          {word}
        </span>
      ))}
    </div>
  );
}

// TextHoverFlip 组件
function TextHoverFlip({
  words,
  textOneClassName = '',
  textTwoClassName = '',
  isHover,
  stagger,
  duration = 0.6,
}: TextHoverFlipProps) {
  const tallestRef = useRef<HTMLDivElement | null>(null);
  const [isCopy, setIsCopy] = useState(false);

  const resizeHeight = useCallback(() => {
    if (tallestRef.current) {
      tallestRef.current.style.height = `${(tallestRef.current?.children[0] as HTMLElement)?.offsetHeight}px`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeHeight);
    return () => {
      window.removeEventListener('resize', resizeHeight);
    };
  }, []);

  useEffect(() => {
    resizeHeight();
    setIsCopy(true);
  }, [words]);

  useGSAP(
    () => {
      if (isHover) {
        gsap.to('.line2', { yPercent: -100, duration, stagger, ease: 'power3.inOut' });
        gsap.to('.line1', { yPercent: -100, duration, stagger, ease: 'power3.inOut' });
      } else {
        gsap.to('.line1', { yPercent: 0, duration, stagger, ease: 'power3.inOut' });
        gsap.to('.line2', { yPercent: 0, duration, stagger, ease: 'power3.inOut' });
      }
    },
    { scope: tallestRef, dependencies: [isHover] },
  );

  return (
    <div ref={tallestRef} className="overflow-hidden flex flex-col tracking-wider text-2xl">
      <Words words={words} className={textOneClassName} lineIndex={1} />
      {isCopy && <Words words={words} className={textTwoClassName} lineIndex={2} />}
    </div>
  );
}

// splitStringIntoChars函数
function splitStringIntoChars(input: string): string[] {
  return input.split('').map((char) => (char === ' ' ? '\u00A0' : char)); // 将空格字符替换为非断行空格
}

export function FlipTextExample() {
  return (
    <div>
      <H2
        dataUrl="https://21st.dev/motion-primitives/dock/default"
        subheading="适合场景：需要文字增加互动感"
        nextUrl={demoUrlList.hover.FlipTextExample.next}
        vueUrl={demoUrlList.hover.FlipTextExample.vue}
        reactUrl={demoUrlList.hover.FlipTextExample.react}
      >
        文字翻转
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
