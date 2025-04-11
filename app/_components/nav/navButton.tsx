import React, { useMemo, useState } from 'react';
import { TextHoverFlip } from '@/_components/react-gsap';

import styles from './nav.module.css';

function splitStringIntoChars(input: string): string[] {
  return input.split('').map((char) => (char === ' ' ? '\u00A0' : char)); // 将空格字符替换为非断行空格
}

export function NavButton({ word, stagger }: { word: string; stagger?: number }) {
  const [isHover, setIsHover] = useState(false);
  // 分割词语为字符数组，用于 TextHoverFlip 组件的 word
  const words = useMemo(() => splitStringIntoChars(word), [word]);
  return (
    <div
      className={styles['nav-button-container']}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <TextHoverFlip words={words} isHover={isHover} stagger={stagger} />
    </div>
  );
}
