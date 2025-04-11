import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { IndicatorDom } from '../indicatorDom';
import { INDICATOR_CLASS_NAME } from '../constant';

import './animationB.css';

import type { IndicatorProps } from '../interface';

export const AnimationB = ({ setState, state }: IndicatorProps) => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to(`.indicator-b .${INDICATOR_CLASS_NAME}`, {
        duration: 0.6,
        y: '0%',
        x: '0%',
        stagger: 0.04,
        delay: 0.5,
        ease: 'power3.out',
      });
    },
    { scope: container },
  );

  return (
    <div className="indicator-b" ref={container}>
      <IndicatorDom setState={setState} state={state} />
    </div>
  );
};
