import { IconEditLine } from '@/_components/icon';
import React, { forwardRef } from 'react';

const getId = (children: React.ReactNode) => (typeof children === 'string' ? children : undefined);

export const H1 = forwardRef(
  (
    {
      children,
      subheading,
      className,
    }: { children: React.ReactNode; subheading?: React.ReactNode; className?: string },
    ref: React.Ref<any>,
  ) => {
    return (
      <h1 className={`font-medium mb-8 text-[36px] relative ${className}`} id={getId(children)} ref={ref}>
        {children}
        <div className="text-xl font-normal text-color-400">{subheading}</div>
      </h1>
    );
  },
);

const editButtonStyle = `
            flex
            items-center
            text-xs
            text-color-400
            hover:bg-color-100
            px-2
            py-1
            rounded-md
            cursor-pointer
            border
            border-solid
            border-color
            mr-3`;
export function H2({
  children,
  subheading,
  dataUrl,
  vueUrl,
  reactUrl,
  nextUrl,
}: {
  children: React.ReactNode;
  subheading?: string;
  dataUrl?: string;
  vueUrl?: string;
  reactUrl?: string;
  nextUrl?: string;
}) {
  return (
    <h2 className="font-medium pb-4 pt-8 text-[28px] bg-white" id={getId(children)}>
      <span data-url={dataUrl}>{children}</span>
      <div className="text-sm font-normal text-color-400">{subheading}</div>
      <div className="mt-4 flex">
        <div className="flex">
          {reactUrl && (
            <div
              className={editButtonStyle}
              onClick={() => {
                window.open(reactUrl, '_blank');
              }}
            >
              <IconEditLine className="mr-2" /> React 代码
            </div>
          )}
          {vueUrl && (
            <div
              className={editButtonStyle}
              onClick={() => {
                window.open(vueUrl, '_blank');
              }}
            >
              <IconEditLine className="mr-2" /> Vue 代码
            </div>
          )}
          {nextUrl && (
            <div
              className={editButtonStyle}
              onClick={() => {
                window.open(nextUrl, '_blank');
              }}
            >
              <IconEditLine className="mr-2" /> Nextjs 代码
            </div>
          )}
        </div>
      </div>
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-medium mb-8 mt-8 text-[20px]" id={getId(children)}>
      {children}
    </h3>
  );
}

export function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-medium mb-8 mt-8 text-[16px]" id={getId(children)}>
      {children}
    </h4>
  );
}

export function H5({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="font-medium mb-8 mt-8 text-[14px]" id={getId(children)}>
      {children}
    </h5>
  );
}

export function H6({ children }: { children: React.ReactNode }) {
  return (
    <h6 className="font-medium mb-8 mt-8 text-[12px]" id={getId(children)}>
      {children}
    </h6>
  );
}
