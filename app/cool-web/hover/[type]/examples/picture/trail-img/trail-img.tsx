'use client';
import React, { Children, type RefObject, TouchEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { H2 } from '@/_components/typography';
import { AnimationSequence, motion, Target, Transition, useAnimate, useAnimationFrame } from 'motion/react';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';
import { getImageUrl } from '@/_utils';

/**
 * hover 类的一定是要有记录在容器相对位置的数据结构
 * 时间监测，例如过了 100ms 就添加一个图片，但注意鼠标没有移动的情况下，就不添加图片
 * 添加的图片本身使用gsap的 timeline 或者 framer 的 sequence s来出现，然后离开即可
 */
/**
 * requestFramexx 在鼠标移动时，并且在一定时间间隔外（interval）（useAnimationFrame），添加图片
 * 整个元素更新都是靠 useMouseVector
 */
const images = [
  '/animation-home/blender.webp',
  '/animation-home/gsap.webp',
  '/animation-home/motion.webp',
  '/animation-home/react.webp',
  '/animation-home/three.webp',
  '/animation-home/vue.webp',
];

function App() {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex w-full h-72 justify-center items-center bg-color-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 z-0" ref={ref}>
        <ImageTrail containerRef={ref}>
          {images.map((url, index) => (
            <div key={index} className="flex relative overflow-hidden w-24 h-24 rounded-lg">
              <img
                src={getImageUrl(url)}
                alt="Trail image"
                className="object-cover absolute inset-0 transition-transform"
              />
            </div>
          ))}
        </ImageTrail>
      </div>
      <h1 className="text-4xl md:text-7xl font-bold z-10 select-none bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-500">
        Hover Me!
      </h1>
    </div>
  );
}

type TrailSegment = [Target, Transition];

type TrailAnimationSequence = TrailSegment[];

interface TrailItem {
  id: string;
  x: number;
  y: number;
  rotation: number;
  animationSequence: TrailAnimationSequence; // Updated type
  scale: number;
  child: React.ReactNode;
}

interface ImageTrailProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  newOnTop?: boolean;
  rotationRange?: number;
  animationSequence?: TrailAnimationSequence; // Updated type
  interval?: number;
  velocityDependentSpawn?: boolean;
}

const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  animationSequence = [
    [{ scale: 1.2 }, { duration: 0.1, ease: 'circOut' }],
    [{ scale: 0 }, { duration: 0.5, ease: 'circIn' }],
  ],
  interval = 100,
}: ImageTrailProps) => {
  const trailRef = useRef<TrailItem[]>([]);

  const lastAddedTimeRef = useRef<number>(0);
  const { position: mousePosition } = useMouseVector(containerRef);
  const lastMousePosRef = useRef(mousePosition);
  const currentIndexRef = useRef(0);
  // Convert children to array for random selection
  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  // Batch updates using useCallback
  const addToTrail = useCallback(
    (mousePos: { x: number; y: number }) => {
      const newItem: TrailItem = {
        id: Math.random().toString(36).substr(2, 9),
        x: mousePos.x,
        y: mousePos.y,
        rotation: (Math.random() - 0.5) * rotationRange * 2,
        animationSequence,
        scale: 1,
        child: childrenArray[currentIndexRef.current],
      };

      // Increment index and wrap around if needed
      currentIndexRef.current = (currentIndexRef.current + 1) % childrenArray.length;

      if (newOnTop) {
        trailRef.current.push(newItem);
      } else {
        trailRef.current.unshift(newItem);
      }
    },
    [childrenArray, rotationRange, animationSequence, newOnTop],
  );

  const removeFromTrail = useCallback((itemId: string) => {
    const index = trailRef.current.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      trailRef.current.splice(index, 1);
    }
  }, []);

  useAnimationFrame((time) => {
    // Skip if mouse hasn't moved
    if (lastMousePosRef.current.x === mousePosition.x && lastMousePosRef.current.y === mousePosition.y) {
      return;
    }
    lastMousePosRef.current = mousePosition;

    const currentTime = time;

    if (currentTime - lastAddedTimeRef.current < interval) {
      return;
    }

    lastAddedTimeRef.current = currentTime;

    addToTrail(mousePosition);
  });

  return (
    <div className="relative w-full h-full pointer-events-none">
      {trailRef.current.map((item) => (
        <TrailItem key={item.id} item={item} onComplete={removeFromTrail} />
      ))}
    </div>
  );
};

interface TrailItemProps {
  item: TrailItem;
  onComplete: (id: string) => void;
}

const TrailItem = ({ item, onComplete }: TrailItemProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const sequence = item.animationSequence.map((segment: TrailSegment) => [scope.current, ...segment]);

    animate(sequence as AnimationSequence).then(() => {
      onComplete(item.id);
    });
  }, [animate, item.animationSequence, item.id, onComplete, scope]);

  return (
    <motion.div
      ref={scope}
      key={item.id}
      className="absolute"
      style={{
        left: item.x,
        top: item.y,
        rotate: item.rotation,
      }}
    >
      {item.child}
    </motion.div>
  );
};

/**
 * 鼠标移动的位置，一般都是有一个相对的 relative 元素传入（containerRef）
 */
export const useMouseVector = (containerRef?: RefObject<HTMLDivElement | null>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [vector, setVector] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    let lastPosition = { x: 0, y: 0 };

    const updatePosition = (x: number, y: number) => {
      let newX, newY;

      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        newX = x - rect.left;
        newY = y - rect.top;
      } else {
        newX = x;
        newY = y;
      }

      // Calculate the movement vector
      const dx = newX - lastPosition.x;
      const dy = newY - lastPosition.y;

      setVector({ dx, dy });
      setPosition({ x: newX, y: newY });
      lastPosition = { x: newX, y: newY };
    };

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    // Listen for both mouse and touch events
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove as any);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove as any);
    };
  }, [containerRef]);

  return { position, vector };
};

export function TrailImgExample() {
  return (
    <div>
      <H2
        subheading="适合场景：增强视觉吸引力，突出品牌个性或艺术感的场景"
        nextUrl={demoUrlList.hover.TrailImgExample.next}
        vueUrl={demoUrlList.hover.TrailImgExample.vue}
        reactUrl={demoUrlList.hover.TrailImgExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-8 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}

// function ImageMouseTrail({ items }) {
//   const containerRef = useRef(null);
//   const refs = useRef(items.map(() => createRef<HTMLImageElement>()));

//   let globalIndex = 0;
//   let last = { x: 0, y: 0 };

//   const activate = (image, x, y) => {
//     const containerRect = containerRef.current?.getBoundingClientRect();
//     const relativeX = x - containerRect.left;
//     const relativeY = y - containerRect.top;
//     image.style.left = `${relativeX}px`;
//     image.style.top = `${relativeY}px`;

//     image.style.zIndex = (globalIndex % items.length) + 1;

//     image.dataset.status = 'active';
//     setTimeout(() => {
//       image.dataset.status = 'inactive';
//     }, 1000);
//     last = { x, y };
//   };

//   const distanceFromLast = (x, y) => {
//     return Math.hypot(x - last.x, y - last.y);
//   };
//   const deactivate = (image) => {
//     image.dataset.status = 'inactive';
//   };
//   const handleOnMove = (e) => {
//     if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / 20) {
//       const lead = refs.current[globalIndex % refs.current.length].current;

//       const tail = refs.current[(globalIndex - 5) % refs.current.length]?.current;

//       if (lead) activate(lead, e.clientX, e.clientY);
//       if (tail) deactivate(tail);

//       globalIndex++;
//     }
//   };

//   return (
//     <section
//       onMouseMove={handleOnMove}
//       onTouchMove={(e) => handleOnMove(e.touches[0])}
//       ref={containerRef}
//       className="grid place-content-center h-[300px] w-full bg-[#e0dfdf] relative overflow-hidden rounded-lg"
//     >
//       {items.map((item, index) => (
//         <img
//           key={index}
//           className="object-cover z-10 w-20 h-20 scale-0 opacity:0 data-[status='active']:scale-100  data-[status='active']:opacity-100 transition-transform duration-500 data-[status='active']:ease-out-expo  absolute  -translate-y-[50%] -translate-x-[50%]"
//           data-index={index}
//           data-status="inactive"
//           src={item}
//           alt={`image-${index}`}
//           ref={refs.current[index]}
//         />
//       ))}
//       <article className="relative z-20 mix-blend-difference">
//         <h1 className="md:text-4xl text-2xl text-center font-semibold">Hover Me ⭐️</h1>
//       </article>
//     </section>
//   );
// }

// const imagesArray = [
//   '/animation-home/blender.webp',
//   '/animation-home/gsap.webp',
//   '/animation-home/motion.webp',
//   '/animation-home/react.webp',
//   '/animation-home/three.webp',
//   '/animation-home/vue.webp',
// ];

// const TrailContainer = () => {
//   const trailContainerRef = useRef(null);
//   const animationStateRef = useRef(null);
//   const trailRef = useRef([]);
//   const currentImageIndexRef = useRef(0);
//   const mousePosRef = useRef({ x: 0, y: 0 });
//   const lastMousePosRef = useRef({ x: 0, y: 0 });
//   const interpolatedMousePosRef = useRef({ x: 0, y: 0 });
//   const isDesktopRef = useRef(false);

//   useEffect(() => {
//     const config = {
//       imageLifespan: 1000,
//       mouseThreshold: 150,
//       inDuration: 750,
//       outDuration: 1000,
//       staggerIn: 100,
//       staggerOut: 100,
//       slideDuration: 1000,
//       slideEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
//       easing: 'cubic-bezier(0.07,0, 0.13, 1)',
//     };

//     const trailImageCount = 20;
//     const images = Array.from({ length: trailImageCount }, (_, i) => imagesArray[i]);

//     const trailContainer = trailContainerRef.current;
//     if (!trailContainer) return;
//     isDesktopRef.current = window.innerWidth > 1000;

//     const MathUtils = {
//       lerp: (a, b, n) => (1 - n) * a + n * b,
//       distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
//     };

//     const getMouseDistance = () =>
//       MathUtils.distance(
//         mousePosRef.current.x,
//         mousePosRef.current.y,
//         lastMousePosRef.current.x,
//         lastMousePosRef.current.y,
//       );

//     const isInTrailContainer = (x, y) => {
//       const rect = trailContainer.getBoundingClientRect();
//       return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
//     };

//     const createTrailImage = () => {
//       const imgContainer = document.createElement('div');
//       imgContainer.classList.add('trail-img');

//       const imgSrc = images[currentImageIndexRef.current];
//       currentImageIndexRef.current = (currentImageIndexRef.current + 1) % images.length;

//       const rect = trailContainer.getBoundingClientRect();
//       const startX = interpolatedMousePosRef.current.x - rect.left - 87.5;
//       const startY = interpolatedMousePosRef.current.y - rect.top - 87.5;
//       const targetX = mousePosRef.current.x - rect.left - 87.5;
//       const targetY = mousePosRef.current.y - rect.top - 87.5;
//       imgContainer.style.left = `${startX}px`;
//       imgContainer.style.top = `${startY}px`;
//       imgContainer.style.transform = `left ${config.slideDuration}ms ${config.slideEasing}, top ${config.slideDuration}ms ${config.slideEasing}`;

//       const maskLayers = [];
//       const imgLayers = [];

//       for (let i = 0; i < 10; i++) {
//         const imageLayer = document.createElement('div');
//         imageLayer.classList.add('image-layer');

//         imageLayer.style.backgroundImage = `url(${imgSrc})`;

//         const startY = i * 10;
//         const endY = (i + 1) * 10;

//         layer.style.clipPath = `polygon(50% ${startY}%, 50% ${startY}%, 50% ${endY}%, 50% ${endY}%)`;

//         layer.style.transition = `clip-path ${config.inDuration}ms ${config.easing}`;

//         layer.style.transform = 'translateZ(0)';

//         layer.style.backfaceVisiblity = 'hidden';

//         layer.appendChild(imageLayer);

//         imgContainer.appendChild(layer);
//         maskLayers.push(layer);
//         imageLayers.push(imageLayer);
//       }

//       trailContainer.appendChild(imgContainer);

//       requestAnimationFrame(() => {
//         imgContainer.style.left = `${targetX}px`;
//         imgContainer.style.top = `${targetY}px`;

//         maskLayers.forEach((layer, i) => {
//           const startY = i * 10;
//           const endY = (i + 1) * 10;
//           const distanceFromMiddle = Math.abs(i - 4.5);
//           const delay = distanceFromMiddle * config;
//         });
//       });
//     };
//   }, []);

//   return <div className="trail-container" ref={trailContainerRef}></div>;
// };
