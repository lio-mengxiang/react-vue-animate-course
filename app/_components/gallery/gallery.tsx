import React, { useEffect, useRef } from 'react';

import { imageAnimationA, imageAnimationB, imageAnimationC } from './utils';
import { GALLERY_CLASS_NAME, IMAGE_NAMES, IMAGE_PATH, ITEM_CLASS_NAME } from './constant';
import Image from 'next/image';

import { type AnimationHomeGalleryProps } from './interface';

import './index.css';

export function Gallery({ state, animationGalleryARef, animationGalleryBRef, animationGalleryCRef }: AnimationHomeGalleryProps) {
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
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
      <div className={GALLERY_CLASS_NAME}>
        {IMAGE_NAMES.map((name) => (
          <div key={name} className={`${ITEM_CLASS_NAME}`}>
            <Image src={`${IMAGE_PATH}/${name}`} alt={name} fill />
          </div>
        ))}
      </div>
    </section>
  );
}
