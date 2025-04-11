import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { IndicatorDom } from '../indicatorDom';
import { INDICATOR_CLASS_NAME } from '../constant';

import './animationA.css';

import type { IndicatorProps } from '../interface';

export const AnimationA = ({ setState, state }: IndicatorProps) => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to(`.indicator-a .${INDICATOR_CLASS_NAME}`, {
        duration: 0.6,
        y: '0%',
        stagger: 0.04,
        delay: 0.6,
        ease: 'power3.out',
      });
    },
    { scope: container },
  );

  return (
    <div className="indicator-a" ref={container}>
      <IndicatorDom setState={setState} state={state} />
    </div>
  );
};
