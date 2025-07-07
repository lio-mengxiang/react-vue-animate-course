import React from 'react';
import { list } from './examples';
import { H1 } from '@/_components/typography';

export default function Scroll() {
  return (
    <div className="flex">
      <div className="grow shrink basis-0 overflow-hidden ml-8 mr-16 mt-8 grid grid-cols-1 gap-y-8 lg:gap-x-5">
        {list.map((item, index) => {
          return (
            <div key={index} className="flex flex-col">
              <H1 subheading={item.description}>{item.title}</H1>
              <>{item.children}</>
            </div>
          );
        })}
      </div>
      <div className="hidden z-10 xl:flex xl:w-48 mt-8 pl-0 shrink-0">catalog</div>
    </div>
  );
}
