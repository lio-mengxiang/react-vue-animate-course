import React from 'react';
import { cs } from '@/_utils';

export const ShadowText = ({ className, text }: { className?: string; text: string }) => {
  return (
    <div
      className={cs(
        'h-[128px] relative inline-flex',
        'text-9xl font-semibold leading-none',
        'before:bg-[length:0.06em_0.06em] before:bg-[repeating-linear-gradient(45deg,black_25%,black_50%,transparent_50%,transparent_75%)] before:bg-clip-text before:text-transparent',
        'before:left-[0.06em] before:top-[0.06em] before:h-full before:w-full before:absolute',
        'before:content-[attr(data-text)]',
        'before:animate-line-shadow',
        `${className}`,
      )}
      data-text={`${text}`}
    >
      {text}
    </div>
  );
};
