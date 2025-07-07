'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { H2 } from '@/_components/typography';
import { cs } from '@/_utils';
import { motion } from 'motion/react';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

/**
 * sequential：true 的逻辑
 * hover 时，每次找到一个 characters 里的随机字符串
 * 如果长度超过 text 本身长度，则停止
 * 每次迭代，获取下一个需要 revealing 的字符索引（ getNextIndex(newSet) ），加入 revealedIndices 中
 * 然后 shuffleText(revealedIndices) 生成新的 displayText，revealedIndices 保存已经乱序的文字，不乱序
 *
 * sequential：false 的逻辑
 * revealedIndices就不用存已经乱序的文字了，直接  setDisplayText(shuffleText(newSet));
 */
function App() {
  return (
    <ScrambleHover
      text="change single character"
      scrambleSpeed={50}
      maxIterations={8}
      useOriginalCharsOnly
      sequential={true}
      revealDirection="start"
      className="cursor-pointer"
      characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\\,./<>?"
    />
  );
}

type RevealDirection = 'start' | 'end' | 'center';

/**
 * text 要显示和打乱的原始文本内容
 * scrambleSpeed 每次字符变动的时间间隔（ms），控制动画速度
 * maxIterations 最大打乱次数（非顺序模式下），即整个文本将被打乱多少次后恢复原文
 * sequential 是否采用顺序揭示模式
 * revealDirection 顺序揭示的方向（仅在 sequential=true 时有效
 * useOriginalCharsOnly 是否只使用原文字中的字符进行打乱（不包括空格）
 * characters 指定打乱时的字符池（当 useOriginalCharsOnly = false 时生效）
 * className 作用于最外层 <motion.span> 和已揭示字符的样式类名
 * scrambledClassName 作用于仍处于打乱中的字符的样式类名，可用于区分视觉样式
 */
interface ScrambleHoverProps {
  text: string;
  scrambleSpeed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  scrambledClassName?: string;
}

const ScrambleHover = ({
  text,
  scrambleSpeed = 50,
  maxIterations = 10,
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className,
  scrambledClassName,
  sequential = false,
  revealDirection = 'start',
  ...props
}: ScrambleHoverProps) => {
  // displayText 当前实际显示在页面上的文本（可以是被打乱的字符)
  const [displayText, setDisplayText] = useState<string>(text);
  // isHovering 当前鼠标是否悬停在组件上
  const [isHovering, setIsHovering] = useState<boolean>(false);
  // revealedIndices 一组已经恢复为原字符的字符索引（在顺序揭示时用）
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableChars: string[] = useOriginalCharsOnly
    ? Array.from(new Set(text)).filter((char) => char !== ' ')
    : characters.split('');

  const getRevealOrder = (len: number, direction: RevealDirection): number[] => {
    switch (direction) {
      case 'start':
        return [...Array(len).keys()];
      case 'end':
        return [...Array(len).keys()].reverse();
      case 'center': {
        const center = (len - 1) / 2;
        return [...Array(len).keys()].sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
      }
      default:
        return [...Array(len).keys()];
    }
  };

  const revealOrder = useMemo(() => getRevealOrder(text.length, revealDirection), [text, revealDirection]);

  const getNextIndex = (revealed: Set<number>): number => {
    for (let i = 0; i < revealOrder.length; i++) {
      const index = revealOrder[i];
      // 找出之前 revealOrder 中没有的 index
      if (!revealed.has(index)) return index;
    }
    return 0;
  };

  function getRandomIntInclusive(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  const shuffleText = (revealed: Set<number>): string => {
    const textArray = text.split('');
    return textArray
      .map((char, i) => {
        // 之前已经 revealed 的字符，不参与随机
        if (char === ' ' || revealed.has(i)) return char;

        // 其它字母参与随机
        if (useOriginalCharsOnly) {
          const unrevealed = textArray
            .map((c, j) => (!revealed.has(j) && c !== ' ' ? c : null))
            .filter(Boolean) as string[];

          return unrevealed[getRandomIntInclusive(0, unrevealed.length - 1)] || char;
        } else {
          // 随机从 character 中取一个字母
          return availableChars[getRandomIntInclusive(0, availableChars.length - 1)];
        }
      })
      .join('');
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    // 没有 hover 的时候 还原
    if (!isHovering) {
      setRevealedIndices(new Set());
      setDisplayText(text);
      return;
    }

    // 开始乱序

    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setRevealedIndices((prev) => {
        const newSet = new Set(prev);

        if (sequential) {
          // 如果长度超过 text 本身长度，则停止
          if (newSet.size >= text.length) {
            clearInterval(intervalRef.current!);
            return newSet;
          }
          // 每次迭代，获取下一个需要 revealing 的字符索引
          const nextIndex = getNextIndex(newSet);
          // 加入 revealedIndices 中
          newSet.add(nextIndex);
          // shuffleText
          setDisplayText(shuffleText(newSet));
          return newSet;
        } else {
          if (iteration >= maxIterations) {
            clearInterval(intervalRef.current!);
            setDisplayText(text);
            return new Set();
          }
          setDisplayText(shuffleText(newSet));
          iteration++;
          return newSet;
        }
      });
    }, scrambleSpeed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering, scrambleSpeed, sequential, revealDirection, text, maxIterations, availableChars.join()]);

  return (
    <motion.span
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className={cs('inline-block whitespace-pre-wrap font-mono', className)}
      {...props}
    >
      <span aria-hidden="true">
        {displayText.split('').map((char, i) => (
          <span key={i} className={cs(revealedIndices.has(i) || !isHovering ? className : scrambledClassName)}>
            {char}
          </span>
        ))}
      </span>
    </motion.span>
  );
};
export function ScrambleTextExample() {
  return (
    <div>
      <H2
        dataUrl="21"
        subheading="适合场景：需要增强文字趣味性的地方"
        nextUrl={demoUrlList.hover.ScrambleTextExample.next}
        vueUrl={demoUrlList.hover.ScrambleTextExample.vue}
        reactUrl={demoUrlList.hover.ScrambleTextExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
