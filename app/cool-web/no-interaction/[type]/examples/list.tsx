import React from 'react';
import * as Text from './text';
import { type DemoComponentProps } from '@/cool-web/interface';
import { type Type } from '../interface';

const textComponents: Record<string, DemoComponentProps> = Text;
// const pictureComponents: Record<string, DemoComponentProps> = Picture;
// const bgComponents: Record<string, DemoComponentProps> = Bg;

export const catalogList = (type: Type) => {
  // if (type === 'bg') {
  //   return Object.keys(bgComponents).map((key: string) => {
  //     const Component = bgComponents[key];
  //     return Component.catalogInfo;
  //   });
  // }
  if (type === 'text') {
    return Object.keys(textComponents).map((key: string) => {
      const Component = textComponents[key];
      return Component.catalogInfo;
    });
  }

  // if (type === 'picture') {
  //   return Object.keys(pictureComponents).map((key: string) => {
  //     const Component = pictureComponents[key];
  //     return Component.catalogInfo;
  //   });
  // }

  return [];
};

export const filterList = (type: Type) => {
  if (type === 'text') {
    return [
      {
        title: (
          <span>
            Hover <span className="text-[#f6c646]">文字</span>特效集合
          </span>
        ),
        description: '鼠标 hover 到文字预览效果',
        children: Object.keys(textComponents).map((key: string, index) => {
          const ComponentInfo = textComponents[key];
          return <ComponentInfo.Component key={index} />;
        }),
      },
    ];
  }
  // if (type === 'picture') {
  //   return [
  //     {
  //       title: (
  //         <span>
  //           Hover <span className="text-[#f6c646]">图片</span>特效集合
  //         </span>
  //       ),
  //       description: '鼠标 hover 到图片预览效果',
  //       children: Object.keys(pictureComponents).map((key: string, index) => {
  //         const ComponentInfo = pictureComponents[key];
  //         return <ComponentInfo.Component key={index} />;
  //       }),
  //     },
  //   ];
  // }

  // if (type === 'bg') {
  //   return [
  //     {
  //       title: (
  //         <span>
  //           Hover <span className="text-[#f6c646]">背景</span>特效集合
  //         </span>
  //       ),
  //       description: '鼠标 hover 到背景预览效果',
  //       children: Object.keys(bgComponents).map((key: string, index) => {
  //         const ComponentInfo = bgComponents[key];
  //         return <ComponentInfo.Component key={index} />;
  //       }),
  //     },
  //   ];
  // }
};
