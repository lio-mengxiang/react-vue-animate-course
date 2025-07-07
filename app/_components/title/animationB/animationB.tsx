import React, { forwardRef, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { cs } from '@/_utils';

import './animationB.css';

export const AnimationB = forwardRef(() => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to('.style-b .word', {
        duration: 0.6,
        y: '0%',
        stagger: 0.02,
        ease: 'power3.out',
      });
    },
    { scope: container },
  );

  return (
    <div className="style-b" ref={container}>
      <span className={cs('font-light', 'text-b')}>
        <div className="word">我</div>
        <div className="word">是</div>
        <div className="word">孟</div>
        <div className="word">祥</div>
        <div className="word">同</div>
        <div className="word">学</div>
        <div className="word">，</div>
      </span>
      <span className={cs('font-light', 'text-b')}>
        <div className="word">热</div>
        <div className="word">爱</div>
        <div className="word">前</div>
        <div className="word">端</div>
        <div className="word">，</div>
      </span>
      <span className={cs('font-bold', 'text-b')}>
        <div className="word">为</div>
        <div className="word">你</div>
        <div className="word">呈</div>
        <div className="word">现</div>
        <div className="word">高</div>
        <div className="word">级</div>
        <div className="word">动</div>
        <div className="word">效</div>
        <div className="word">课</div>
        <div className="word">程</div>
        <div className="word">！</div>
      </span>
    </div>
  );
});
