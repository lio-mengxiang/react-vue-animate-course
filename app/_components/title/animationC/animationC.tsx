import React, { forwardRef, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { cs } from '@/utils';

import './animationC.css';

export const AnimationC = forwardRef(() => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to('.style-c .word', {
        duration: 0.4,
        y: '0%',
        stagger: 0.04,
        ease: 'power3.out',
      });
    },
    { scope: container },
  );

  return (
    <div className="style-c" ref={container}>
      <span className={cs('font-light', 'text-c')}>
        <div className="word">让</div>
        <div className="word">你</div>
        <div className="word">的</div>
        <div className="word">博</div>
        <div className="word">客</div>
        <div className="word">亮</div>
        <div className="word">眼</div>
      </span>
      <span className={cs('font-bold', 'text-c')}>
        <div className="word">让</div>
        <div className="word">简</div>
        <div className="word">历</div>
        <div className="word">更</div>
        <div className="word">有</div>
        <div className="word">竞</div>
        <div className="word">争</div>
        <div className="word">力</div>
      </span>
    </div>
  );
});
