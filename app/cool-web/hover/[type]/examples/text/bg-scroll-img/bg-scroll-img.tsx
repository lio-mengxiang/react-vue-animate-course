'use client';

import React, { type JSX, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { H2 } from '@/_components/typography';
import { catalogInfo } from './constants';
import { demoUrlList } from '@/cool-web/demo-list';

type ProjectId = 'p1' | 'p2' | 'p3' | 'p4';

interface ProjectElement extends HTMLElement {
  id: ProjectId;
  _moveEvent?: (e: MouseEvent) => void;
}

/**
 * 本质就是 bgPositions 的变换
 */
export default function App(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const projects = document.querySelector('.projects') as HTMLDivElement | null;
      const preview = document.querySelector('.preview') as HTMLDivElement | null;
      const previewImg = document.querySelector('.preview-img') as HTMLDivElement | null;

      if (!projects || !preview || !previewImg || !containerRef.current) return;

      const bgPositions: Record<ProjectId, string> = {
        p1: '0 0',
        p2: '0 34%',
        p3: '0 65%',
        p4: '0 100%',
      };

      const isMouseInsideContainer = (e: MouseEvent): boolean => {
        const containerRect = projects.getBoundingClientRect();

        return (
          e.clientX >= containerRect.left &&
          e.clientX <= containerRect.right &&
          e.clientY >= containerRect.top &&
          e.clientY <= containerRect.bottom
        );
      };

      const moveStuff = (e: MouseEvent): void => {
        const mouseInside = isMouseInsideContainer(e);

        gsap.to(preview, {
          duration: 0.3,
          scale: mouseInside ? 1 : 0,
        });
      };

      const moveProject = (e: MouseEvent, project: ProjectElement): void => {
        const previewRect = preview.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();

        const offsetX = previewRect.width / 2;
        const offsetY = previewRect.height / 2;

        preview.style.left = `${e.clientX - containerRect.left - offsetX}px`;
        preview.style.top = `${e.clientY - containerRect.top - offsetY}px`;

        const projectId = project.id as ProjectId;

        gsap.to(previewImg, {
          opacity: 1,
          duration: 0.4,
          backgroundPosition: bgPositions[projectId] || '0 0',
        });
      };

      window.addEventListener('mousemove', moveStuff);

      Array.from(projects.children).forEach((child) => {
        const project = child as ProjectElement;
        project._moveEvent = (e: MouseEvent) => moveProject(e, project);
        project.addEventListener('mousemove', project._moveEvent);
      });

      return () => {
        Array.from(projects.children).forEach((child) => {
          const project = child as ProjectElement;
          if (project._moveEvent) {
            project.removeEventListener('mousemove', project._moveEvent);
          }
        });

        window.removeEventListener('mousemove', moveStuff);
      };
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="preview absolute w-64 h-64 overflow-hidden pointer-events-none origin-center">
        <div className="preview-img opacity-0 bg-[url(/sprite_bg.webp)] w-full h-full bg-cover bg-[left_0_top_0] pointer-events-none"></div>
      </div>
      <div className="projects flex flex-col">
        <div className="project" id="p1">
          <div className="text-orange-800 client flex justify-center py-6 bg-orange-100 rounded-t-md">
            A Little Chicken
          </div>
        </div>
        <div className="project" id="p2">
          <div className="text-orange-800 client flex justify-center py-6 bg-orange-200">A Little Dog</div>
        </div>
        <div className="project" id="p3">
          <div className="text-orange-800 client flex justify-center py-6 bg-orange-300">A Little Cow</div>
        </div>
        <div className="project" id="p4">
          <div className="text-orange-800 client flex justify-center py-6 bg-orange-400 rounded-b-md">A Little Cat</div>
        </div>
      </div>
    </div>
  );
}

export function BgScrollImgExample() {
  return (
    <div>
      <H2
        subheading="适合场景：背景动画增强文字的吸引力"
        nextUrl={demoUrlList.hover.BgScrollImgExample.next}
        vueUrl={demoUrlList.hover.BgScrollImgExample.vue}
        reactUrl={demoUrlList.hover.BgScrollImgExample.react}
      >
        {catalogInfo.text}
      </H2>
      <div className="px-8 py-16 flex justify-center bg-color-50">
        <App />
      </div>
    </div>
  );
}
