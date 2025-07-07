'use client';
import React, { useRef, type JSX } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { H2 } from '@/_components/typography';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

gsap.registerPlugin(SplitText);

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const profileImagesContainer = document.querySelector('.profile-images') as HTMLElement | null;
      const profileImages = document.querySelectorAll<HTMLDivElement>('.profile-images .img');
      const nameElements = document.querySelectorAll<HTMLDivElement>('.profile-names .name');
      const nameHeadings = document.querySelectorAll<HTMLHeadingElement>('.profile-names .name h1');
      const defaultH1 = document.querySelector('.default h1') as HTMLElement | null;

      if (!defaultH1 || !profileImagesContainer) return;

      nameHeadings.forEach((heading) => {
        const split = new SplitText(heading, { type: 'chars' });
        split.chars?.forEach((char) => {
          char.classList.add('letter');
        });
      });

      const split = new SplitText(defaultH1, { type: 'chars' });
      split.chars?.forEach((char) => {
        char.classList.add('letter');
      });

      const defaultLetters = defaultH1.querySelectorAll<HTMLElement>('.letter');

      profileImages.forEach((img, index) => {
        const correspondingElement = nameElements[index];
        if (!correspondingElement) return;

        const letters = correspondingElement.querySelectorAll<HTMLElement>('.letter');

        img.addEventListener('mouseenter', () => {
          gsap.killTweensOf(img);
          gsap.killTweensOf(letters);

          gsap.to(img, {
            width: 80,
            height: 80,
            duration: 0.5,
            ease: 'power4.out',
          });
          gsap.to(letters, {
            y: '-100%',
            duration: 0.75,
            ease: 'power4.out',
            stagger: {
              each: 0.025,
              from: 'center',
            },
          });
        });

        img.addEventListener('mouseleave', () => {
          gsap.killTweensOf(img);
          gsap.killTweensOf(letters);

          gsap.to(img, {
            width: '4rem',
            height: '4rem',
            duration: 0.5,
            ease: 'power4.out',
          });
          gsap.to(letters, {
            y: '0%',
            duration: 0.75,
            ease: 'power4.out',
            stagger: {
              each: 0.025,
              from: 'center',
            },
          });
        });
      });

      profileImagesContainer.addEventListener('mouseenter', () => {
        gsap.to(defaultLetters, {
          y: '-100%',
          duration: 0.75,
          ease: 'power4.out',
          stagger: {
            each: 0.025,
            from: 'center',
          },
        });
      });

      profileImagesContainer.addEventListener('mouseleave', () => {
        gsap.to(defaultLetters, {
          y: '0%',
          duration: 0.75,
          ease: 'power4.out',
          stagger: {
            each: 0.025,
            from: 'center',
          },
        });
      });
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <section
      className="absolute w-full text-color-500 flex flex-col justify-center items-center overflow-hidden"
      ref={containerRef}
    >
      <div className="profile-images w-max flex justify-center items-center">
        {['motion', 'three', 'react', 'vue'].map((_, i) => (
          <div key={i} className="img w-16 h-16 object-cover p-2 cursor-pointer will-change-auto">
            <img className="rounded-lg" src={`/animation-home/${_}.webp`} alt="" />
          </div>
        ))}
      </div>
      <div className="default text-7xl leading-[9rem] h-36 font-bold">
        <h1 className="h-full overflow-hidden">JOIN US!</h1>
      </div>
      <div className="profile-names text-7xl leading-[9rem] h-36 absolute top-16 w-full font-bold text-error-color flex justify-center uppercase">
        {['motion', 'three', 'react', 'vue'].map((name, i) => (
          <div key={i} className="name absolute t-0 overflow-hidden">
            <h1 className="translate-y-[100%]">{name}</h1>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TextChangeExample(): JSX.Element {
  return (
    <div>
      <H2
        subheading="适合场景：对图片的文字说明，增强互动感"
        nextUrl={demoUrlList.hover.TextChangeExample.next}
        vueUrl={demoUrlList.hover.TextChangeExample.vue}
        reactUrl={demoUrlList.hover.TextChangeExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="relative px-8 py-16 flex justify-center bg-color-50 h-[300px]">
        <App />
      </div>
    </div>
  );
}
