'use client';

import React from 'react';
import { useCodePreview } from './hooks';
import * as gsapReact from '@gsap/react';
import * as Motion from 'motion/react';
import * as T from '@t-headless-ui/react';
import SplitText from 'gsap-trial/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { cs } from '@/_utils';
import { CodeTab, ErrorMessage } from './components';
import * as Utils from '../../cool-web/utils';
import type { CodePreviewProps } from './interface';
import { useScreenSize } from '@/cool-web/hover/[type]/examples/picture/gooey-trail/use-screen-size';
import { PixelTrail } from '@/cool-web/hover/[type]/examples/picture/gooey-trail/pixel-trail';

const Depend = {
  ...gsapReact,
  gsap,
  ...T,
  ...Motion,
  ...React,
  cs,
  SplitText,
  ScrollTrigger,
  ...Utils,
  useScreenSize,
  PixelTrail,
};
export function CodePreview(props: CodePreviewProps) {
  const { code: _Code = '', dependencies = Depend, demoContainerClassName, cssCode } = props;

  const { state, onChange } = useCodePreview({ code: _Code, dependencies, ...props });
  const Element = state.element;

  return (
    <>
      <div
        className={cs(
          'relative p-6 overflow-hidden min-w-25 border border-solid border-color rounded-md',
          {
            [`z-2 mb-0 text-red-600`]: !!state.error,
          },
          demoContainerClassName,
        )}
      >
        <>
          <ErrorMessage message={state.error} />
          <>{Element ? <Element /> : null}</>
        </>
      </div>
      <CodeTab code={_Code} onChange={onChange} cssCode={cssCode} />
    </>
  );
}

CodePreview.displayName = 'CodePreview';
