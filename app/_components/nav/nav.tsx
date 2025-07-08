'use client';
import React, { type MouseEvent, useEffect, useRef, useState } from 'react';
import Logo from '@/_components/logo';
import { NavButton } from './nav-button';
import { GithubLink } from './components/github-link';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { getHomePath } from '../../../next.config';

const menuLinks = [
  {
    label: 'Hover 特效',
    children: [
      { path: '/cool-web/hover/text', label: '文字特效' },
      { path: '/cool-web/hover/bg', label: '背景特效' },
      { path: '/cool-web/hover/picture', label: '图片特效' },
    ],
  },
];

export function Nav() {
  const container = useRef(null);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tl = useRef<any>(null);

  const toggleMenu = (e: MouseEvent<HTMLDivElement | HTMLSpanElement>, value?: boolean) => {
    if (value) {
      setIsMenuOpen(value);
      return;
    }
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(
    () => {
      gsap.set('.menu-link-item-holder', { y: 75 });
      tl.current = gsap
        .timeline({ paused: true })
        .to('.menu-overlay', {
          duration: 1.25,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          ease: 'power4.inOut',
        })
        .to('.menu-link-item-holder', {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.inOut',
          delay: -0.75,
        });
    },
    { scope: container },
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.current.reverse();
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <nav
      className="nav fixed w-full flex justify-between items-center pl-6 pr-6 h-16 top-0 z-popup border-b border-color border-solid bg-white"
      ref={container}
    >
      <div className="text-sm flex items-end gap-x-1">
        <Logo
          className="text-2xl cursor-pointer"
          onClick={() => {
            router.push(getHomePath());
          }}
        />
      </div>
      <div className="flex gap-x-4 items-center">
        <div className="hover:bg-slate-50 px-4 py-2 rounded-md" onClick={toggleMenu}>
          <NavButton word="动效集合" stagger={0.02} />
        </div>
        <GithubLink />
      </div>
      <div
        className="menu-overlay fixed top-0 left-0 w-screen h-screen px-6 py-5 bg-[#f6c646] z-[2] flex"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
      >
        {/* nav bar */}
        <div
          className="absolute group bottom-4 left-1/2 g active:text-slate-400 px-4 py-2 rounded-md cursor-pointer w-7 h-7 flex justify-center items-center bg-[#0a0a0a] text-[#f5c747]"
          onClick={toggleMenu}
        >
          <div className="group-hover:rotate-180 duration-300">&#x2715;</div>
        </div>

        {/* menu content */}
        <div className="mt-2 px-12 w-full font-geist-sans">
          {menuLinks.map((item, index) => (
            <div key={index} className="md:w-1/4 w-full text-[#191919]">
              <div className="h-[1px] w-full bg-[#191919] overflow-hidden mb-[6px]"></div>
              <div className="px-1">
                <div key={item.label} className="text-base text-black/40">
                  {item.label}
                </div>
                <div className="mt-[24px]">
                  {item.children.map((child, index) => (
                    <div
                      key={child.label}
                      className={`text-2xl tracking-wide cursor-pointer ${index !== 0 ? 'mt-3' : ''}`}
                    >
                      <span
                        onClick={(e) => {
                          router.push(child.path);
                          toggleMenu(e, false);
                        }}
                        className="relative after:absolute after:bg-black after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300"
                      >
                        {child.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
