import React, { useEffect, useRef } from 'react';
import { createImages, imageAnimationA, imageAnimationB, imageAnimationC } from './utils';
import { GALLERY_CLASS_NAME, ITEM_CLASS_NAME } from './constant';

import { type AnimationHomeGalleryProps } from './interface';

import './index.css';

export function Gallery({ state, animationGalleryARef, animationGalleryBRef, animationGalleryCRef }: AnimationHomeGalleryProps) {
  const container = useRef<HTMLElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      const gallery = document.querySelector(`.${GALLERY_CLASS_NAME}`) as HTMLElement | null;
      createImages({ gallery });
      isInitialized.current = true;
    }
    if (state === 'A') {
      imageAnimationA({
        container,
        items: document.querySelectorAll(`.${ITEM_CLASS_NAME}`),
        animationGalleryARef,
        animationGalleryBRef,
        animationGalleryCRef,
      });
    }

    if (state === 'B') {
      imageAnimationB({
        container,
        items: document.querySelectorAll(`.${ITEM_CLASS_NAME}`),
        animationGalleryARef,
        animationGalleryBRef,
        animationGalleryCRef,
      });
    }

    if (state === 'C') {
      imageAnimationC({
        container,
        items: document.querySelectorAll(`.${ITEM_CLASS_NAME}`),
        animationGalleryARef,
        animationGalleryBRef,
        animationGalleryCRef,
      });
    }
  }, [animationGalleryARef, animationGalleryBRef, animationGalleryCRef, state]);

  return (
    <section className="gallery-container" ref={container}>
      <div className={GALLERY_CLASS_NAME}></div>
    </section>
  );
}
