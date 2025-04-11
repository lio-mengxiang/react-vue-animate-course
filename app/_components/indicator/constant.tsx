import gsap from 'gsap';

import type { leaveIndicatorProps } from './interface';

export const INDICATOR_CLASS_NAME = 'indicator';
export const INDICATOR_ITEM_CLASS_NAME = 'indicator-item';

export const leaveIndicatorAnimation: leaveIndicatorProps = {
  leaveIndicatorA: () => {
    gsap.to(`.indicator-a .${INDICATOR_CLASS_NAME}`, {
      duration: 0.4,
      y: '100%',
      ease: 'power3.in',
    });
  },
  leaveIndicatorB: () => {
    gsap.to(`.indicator-b .${INDICATOR_CLASS_NAME}`, {
      duration: 0.4,
      y: '100%',
      ease: 'power3.in',
    });
  },
  leaveIndicatorC: () => {
    gsap.to(`.indicator-c .${INDICATOR_CLASS_NAME}`, {
      duration: 0.4,
      y: '100%',
      ease: 'power3.in',
    });
  },
};
