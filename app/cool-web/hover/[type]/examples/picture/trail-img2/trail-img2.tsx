// 'use client';
// import React, { useEffect, useRef } from 'react';
// import { H2 } from '@/_components/typography';

// /**
//  * hover 类的一定是要有记录在容器相对位置的数据结构
//  * 时间监测，例如过了 100ms 就添加一个图片，但注意鼠标没有移动的情况下，就不添加图片
//  * 添加的图片本身使用gsap的 timeline 或者 framer 的 sequence s来出现，然后离开即可
//  */

// const imagesArray = [
//   '/animation-home/blender.webp',
//   '/animation-home/gsap.webp',
//   '/animation-home/motion.webp',
//   '/animation-home/react.webp',
//   '/animation-home/three.webp',
//   '/animation-home/vue.webp',
// ];

// export const TrailContainer = () => {
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

//     const trailImageCount = 6; // 修复：trailImageCount 应该是 imagesArray.length，而不是 20
//     const images = imagesArray;

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
//       imgContainer.classList.add('absolute', 'w-[175px]', 'h-[175px]', 'overflow-hidden');

//       const imgSrc = images[currentImageIndexRef.current];
//       currentImageIndexRef.current = (currentImageIndexRef.current + 1) % images.length;

//       const rect = trailContainer.getBoundingClientRect();
//       const startX = interpolatedMousePosRef.current.x - rect.left - 87.5;
//       const startY = interpolatedMousePosRef.current.y - rect.top - 87.5;
//       const targetX = mousePosRef.current.x - rect.left - 87.5;
//       const targetY = mousePosRef.current.y - rect.top - 87.5;

//       imgContainer.style.left = `${startX}px`;
//       imgContainer.style.top = `${startY}px`;
//       imgContainer.style.transition = `left ${config.slideDuration}ms ${config.slideEasing}, top ${config.slideDuration}ms ${config.slideEasing}`;

//       const maskLayers = [];
//       const imageLayers = [];

//       for (let i = 0; i < 10; i++) {
//         const layer = document.createElement('div');
//         layer.classList.add('absolute', 'w-full', 'h-full', 'overflow-hidden');

//         const imageLayer = document.createElement('div');
//         imageLayer.classList.add('w-full', 'h-full', 'bg-cover', 'bg-center', 'will-change-[transform,opacity]');

//         imageLayer.style.backgroundImage = `url(${imgSrc})`;

//         const startY = i * 10;
//         const endY = (i + 1) * 10;

//         layer.style.clipPath = `polygon(50% ${startY}%, 50% ${startY}%, 50% ${endY}%, 50% ${endY}%)`;
//         layer.style.transition = `clip-path ${config.inDuration}ms ${config.easing}`;
//         layer.style.transform = 'translateZ(0)';
//         layer.style.backfaceVisibility = 'hidden'; // 修复：拼写错误

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
//           const delay = distanceFromMiddle * config.staggerIn;

//           setTimeout(() => {
//             layer.style.clipPath = `polygon(0% ${startY}%, 100% ${startY}%, 100% ${endY}%, 0% ${endY}%)`;
//           }, delay);
//         });
//       });

//       trailRef.current.push({
//         element: imgContainer,
//         maskLayers,
//         imageLayers,
//         removeItem: Date.now() + config.imageLifespan,
//       });
//     };

//     const removeOldImage = () => {
//       const now = Date.now();
//       if (trailRef.current.length === 0) return;
//       const oldestImage = trailRef.current[0];
//       if (now >= oldestImage.removeItem) {
//         const imgToRemove = trailRef.current.shift();

//         imgToRemove.maskLayers.forEach((layer, i) => {
//           const startY = i * 10;
//           const endY = (i + 1) * 10;
//           const distanceFromEdge = 4.5 - Math.abs(i - 4.5);
//           const delay = distanceFromEdge * config.staggerOut;

//           layer.style.transition = `clip-path ${config.outDuration}ms ${config.easing}`;
//           setTimeout(() => {
//             layer.style.clipPath = `polygon(50% ${startY}%, 50% ${startY}%, 50% ${endY}%, 50% ${endY}%)`;
//           }, delay);
//         });

//         imgToRemove.imageLayers.forEach((imageLayer) => {
//           imageLayer.style.transition = `opacity ${config.outDuration}ms ${config.easing}`;
//           imageLayer.style.opacity = '0.25';
//         });

//         setTimeout(() => {
//           if (imgToRemove.element.parentNode) {
//             imgToRemove.element.parentNode.removeChild(imgToRemove.element);
//           }
//         }, config.outDuration + 100);
//       }
//     };

//     const render = () => {
//       if (!isDesktopRef.current) return;
//       const distance = getMouseDistance();

//       interpolatedMousePosRef.current.x = MathUtils.lerp(interpolatedMousePosRef.current.x, mousePosRef.current.x, 0.1);
//       interpolatedMousePosRef.current.y = MathUtils.lerp(interpolatedMousePosRef.current.y, mousePosRef.current.y, 0.1);

//       if (distance > config.mouseThreshold && isInTrailContainer(mousePosRef.current.x, mousePosRef.current.y)) {
//         createTrailImage();
//         lastMousePosRef.current = { ...mousePosRef.current };
//       }

//       removeOldImage();
//       animationStateRef.current = requestAnimationFrame(render);
//     };

//     const startAnimation = () => {
//       if (!isDesktopRef.current) return;
//       const handleMouseMove = (ev) => {
//         mousePosRef.current = { x: ev.clientX, y: ev.clientY };
//       };

//       document.addEventListener('mousemove', handleMouseMove);
//       animationStateRef.current = requestAnimationFrame(render);

//       return () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//       };
//     };

//     const stopAnimation = () => {
//       if (animationStateRef.current) {
//         cancelAnimationFrame(animationStateRef.current);
//         animationStateRef.current = null;
//       }

//       trailRef.current.forEach((item) => {
//         if (item.element.parentNode) {
//           item.element.parentNode.removeChild(item.element);
//         }
//       });
//       trailRef.current.length = 0;
//     };

//     let cleanupMouseListener = null;

//     const handleResize = () => {
//       const wasDesktop = isDesktopRef.current;
//       isDesktopRef.current = window.innerWidth > 1000;

//       if (isDesktopRef.current && !wasDesktop) {
//         cleanupMouseListener = startAnimation();
//       } else if (!isDesktopRef.current && wasDesktop) {
//         stopAnimation();
//         if (cleanupMouseListener) {
//           cleanupMouseListener();
//         }
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     if (isDesktopRef.current) {
//       cleanupMouseListener = startAnimation();
//     }

//     return () => {
//       stopAnimation();
//       if (cleanupMouseListener) {
//         cleanupMouseListener();
//       }
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className="relative h-[400px] overflow-hidden">
//       <div className="trail-container absolute inset-0" ref={trailContainerRef}></div>
//     </div>
//   );
// };
