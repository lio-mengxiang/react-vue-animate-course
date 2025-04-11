import gsap from 'gsap';
import type { leaveTitleProps } from './interface';

export const leaveTitleAnimation: leaveTitleProps = {
  leaveTitleA: ({ onCompleteCallback, onStartCallback }) => {
    gsap.to('.style-a .word', {
      duration: 0.4,
      y: '100%',
      ease: 'power3.in',
      onComplete: () => {
        onCompleteCallback?.();
      },
      onStart: () => {
        onStartCallback?.();
      },
    });
  },
  leaveTitleB: ({ onCompleteCallback, onStartCallback }) => {
    gsap.to('.style-b .word', {
      duration: 0.4,
      y: '100%',
      ease: 'power2.in',
      onComplete: () => {
        onCompleteCallback?.();
      },
      onStart: () => {
        onStartCallback?.();
      },
    });
  },
  leaveTitleC: ({ onCompleteCallback, onStartCallback }) => {
    gsap.to('.style-b .word', {
      duration: 0.4,
      y: '100%',
      ease: 'power2.in',
      onComplete: () => {
        onCompleteCallback?.();
      },
      onStart: () => {
        onStartCallback?.();
      },
    });
  },
};
