'use client';
import React from 'react';
import { H2 } from '@/_components/typography';
import { ShadowText } from './shadow-text-component';

function App() {
  return <ShadowText text="fast" />;
}

export function LineShadowExample() {
  return (
    <div>
      <H2 dataUrl="https://21st.dev/motion-primitives/magnetic/nested" subheading="适合场景：需要增强文字表现力的标题">
        线条阴影动画
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
