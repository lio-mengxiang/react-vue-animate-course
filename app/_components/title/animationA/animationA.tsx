import React, { forwardRef, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { cs } from '@/utils';

import './animationA.css';

export const AnimationA = forwardRef(() => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to('.style-a .word', {
        duration: 0.6,
        y: '0%',
        stagger: 0.04,
        ease: 'power3.out',
      });
    },
    { scope: container },
  );

  return (
    <div className="style-a" ref={container}>
      <span className={cs('font-light', 'text-a')}>
        <div className="word">乡</div>
        <div className="word">亲</div>
        <div className="word">们，</div>
        <div className="word">前</div>
        <div className="word">端</div>
        <div className="word">动</div>
        <div className="word">效</div>
      </span>
      <span className={cs('font-bold', 'text-a')}>
        <div className="word">一</div>
        <div className="word">起</div>
        <div className="word">玩</div>
        <div className="word">转</div>
        <div className="word">！</div>
      </span>
    </div>
  );
});
