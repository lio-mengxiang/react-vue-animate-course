import React from 'react';
import * as Text from './text';
// import * as Picture from './picture';
import * as Bg from './bg';

const textComponents: Record<string, React.FC> = Text;
// const pictureComponents: Record<string, React.FC> = Picture;
const bgComponents: Record<string, React.FC> = Bg;

export const list = [
  {
    title: 'Hover 文字特效集合',
    description: '鼠标 hover 到文字预览效果',
    children: Object.keys(textComponents).map((key: string, index) => {
      const Component = textComponents[key];
      return <Component key={index} />;
    }),
  },
  // {
  //   title: 'Hover 图片特效集合',
  //   description: '鼠标 hover 到图片预览效果',
  //   children: Object.keys(pictureComponents).map((key: string, index) => {
  //     const Component = pictureComponents[key];
  //     return <Component key={index} />;
  //   }),
  // },
  {
    title: 'Hover 背景特效集合',
    description: '鼠标 hover 到背景预览效果',
    children: Object.keys(bgComponents).map((key: string, index) => {
      const Component = bgComponents[key];
      return <Component key={index} />;
    }),
  },
];
