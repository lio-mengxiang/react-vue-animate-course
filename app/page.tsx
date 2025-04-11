'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';

import { Nav } from '@/_components/nav';
import { Gallery } from '@/_components/gallery';
import { Title } from '@/_components/title';
import { Indicator } from '@/_components/indicator';

import './page.css';

import type { StateEnum } from './interface';

export default function Home() {
  const container = useRef(null);

  const [state, setState] = useState<StateEnum>('A');

  const animationGalleryARef = useRef<gsap.core.Timeline>(gsap.timeline());
  const animationGalleryBRef = useRef<gsap.core.Timeline>(gsap.timeline());
  const animationGalleryCRef = useRef<gsap.core.Timeline>(gsap.timeline());

  return (
    <div className="page" ref={container}>
      <Nav />
      <Title state={state} />
      <Gallery
        state={state}
        animationGalleryARef={animationGalleryARef}
        animationGalleryBRef={animationGalleryBRef}
        animationGalleryCRef={animationGalleryCRef}
      />
      <Indicator setState={setState} state={state} />
    </div>
  );
}
