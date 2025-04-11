import React from 'react';
import { INDICATOR_CLASS_NAME, INDICATOR_ITEM_CLASS_NAME, leaveIndicatorAnimation } from './constant';
import { leaveTitleAnimation } from '../title';
import { cs } from '@/utils';

import './indicator.css';

import { type IndicatorProps } from './interface';

export function IndicatorDom({ setState, state }: IndicatorProps) {
  return (
    <div className={INDICATOR_CLASS_NAME}>
      <div
        className={cs(INDICATOR_ITEM_CLASS_NAME, state === 'A' ? 'active' : null)}
        onClick={() => {
          if (state === 'B') {
            leaveTitleAnimation.leaveTitleB({
              onCompleteCallback: () => setState('A'),
              onStartCallback: () => leaveIndicatorAnimation.leaveIndicatorB(),
            });
          }
          if (state === 'C') {
            leaveTitleAnimation.leaveTitleC({
              onCompleteCallback: () => setState('A'),
              onStartCallback: () => leaveIndicatorAnimation.leaveIndicatorC(),
            });
          }
        }}
      >
        横向展开
      </div>
      <div
        className={cs(INDICATOR_ITEM_CLASS_NAME, state === 'B' ? 'active' : null)}
        onClick={() => {
          if (state === 'A') {
            leaveTitleAnimation.leaveTitleA?.({
              onCompleteCallback: () => setState('B'),
              onStartCallback: () => leaveIndicatorAnimation.leaveIndicatorA(),
            });
          }
          if (state === 'C') {
            leaveTitleAnimation.leaveTitleC?.({
              onCompleteCallback: () => setState('B'),
              onStartCallback: () => leaveIndicatorAnimation.leaveIndicatorC(),
            });
          }
        }}
      >
        斜向展开
      </div>
      <div
        className={cs(INDICATOR_ITEM_CLASS_NAME, state === 'C' ? 'active' : null)}
        onClick={() => {
          if (state === 'A') {
            leaveTitleAnimation.leaveTitleA?.({
              onCompleteCallback: () => setState('C'),
              onStartCallback: () => leaveIndicatorAnimation.leaveIndicatorA(),
            });
          }
          if (state === 'B') {
            leaveTitleAnimation.leaveTitleB?.({
              onCompleteCallback: () => setState('C'),
              onStartCallback: () => leaveIndicatorAnimation.leaveIndicatorB(),
            });
          }
        }}
      >
        圆形展开
      </div>
    </div>
  );
}
