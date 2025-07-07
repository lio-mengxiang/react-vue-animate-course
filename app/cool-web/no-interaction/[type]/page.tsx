import React from 'react';
import { catalogList, filterList } from './examples';
import { typeList } from './constants';
import { type Type } from './interface';
import { Catalog } from '@/_components/catalog';
import { Heading } from '@/_components/heading';

export default async function CoolWeb({ params }: { params: Promise<{ type: Type }> }) {
  const { type } = await params;

  return (
    <div className="flex pb-8 mt-16">
      <div className="grow shrink basis-0 overflow-hidden ml-8 mr-16 mt-8 grid grid-cols-1 gap-y-8 lg:gap-x-5">
        {filterList(type)!.map((item, index) => {
          return (
            <div key={index} className="flex flex-col">
              <Heading description={item.description} title={item.title} />
              <>{item.children}</>
            </div>
          );
        })}
      </div>
      <div className="z-10 xl:flex xl:w-48 mt-8 pl-0 shrink-0">
        <Catalog items={catalogList(type)} offset={-90} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return typeList.map((type) => {
    return {
      type,
    };
  });
}
