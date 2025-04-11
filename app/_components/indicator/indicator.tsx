import React from 'react';

import { AnimationA } from './animationA';
import { AnimationB } from './animationB';
import { AnimationC } from './animationC';

import './indicator.css';

export function Indicator({ setState, state }: any) {
  return (
    <div className="indicator-wrapper">
      {state === 'A' && <AnimationA setState={setState} state={state} />}
      {state === 'B' && <AnimationB setState={setState} state={state} />}
      {state === 'C' && <AnimationC setState={setState} state={state} />}
    </div>
  );
}
