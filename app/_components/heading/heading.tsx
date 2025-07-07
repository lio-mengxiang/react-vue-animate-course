'use client';
import React, { ReactNode, useRef } from 'react';
import { Ellipse1, Ellipse2, Ellipse3 } from '@/cool-web/_bg';
import { H1 } from '../typography';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export function Heading({ description, title }: { description: ReactNode; title: ReactNode }) {
  const rectRefs = useRef<SVGRectElement[]>([]);
  const pathRefs = useRef<SVGPathElement[]>([]);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      rectRefs.current.forEach((rect, i) => {
        const path = pathRefs.current[i];
        if (!rect || !path) return;

        gsap.to(rect, {
          duration: 8 + i,
          repeat: -1,
          ease: 'none',
          motionPath: {
            path,
            align: path,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        });
      });
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <H1 subheading={description} className="pb-20 pt-6 z-[-2]" ref={containerRef}>
      {title}
      <div className="absolute -top-[100px] -left-[100px] [transform:rotateX(50deg)]">
        <Ellipse1
          svgProps={{ className: 'absolute top-0 overflow-visible' }}
          pathProps={{
            ref: (el) => {
              if (el) pathRefs.current[0] = el;
            },
          }}
          rectProps={{
            ref: (el) => {
              if (el) rectRefs.current[0] = el;
            },
            fill: '#4285F4',
          }}
        />
        <Ellipse2
          svgProps={{ className: 'absolute -top-[27px] -left-[37px] overflow-visible' }}
          pathProps={{
            ref: (el) => {
              if (el) pathRefs.current[1] = el;
            },
          }}
          rectProps={{
            ref: (el) => {
              if (el) rectRefs.current[1] = el;
            },
            fill: '#34A853',
          }}
        />
        <Ellipse3
          svgProps={{ className: 'absolute -top-[50px] -left-[106px] overflow-visible' }}
          pathProps={{
            ref: (el) => {
              if (el) pathRefs.current[2] = el;
            },
          }}
          rectProps={{
            ref: (el) => {
              if (el) rectRefs.current[2] = el;
            },
            fill: '#FBBC05',
          }}
        />
      </div>
    </H1>
  );
}
