'use client';

import React, { forwardRef } from 'react';

import type { FlexProps } from './interface';

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(props, ref) {
  const { direction, align, justify, wrap, basis, grow, shrink, inline, ...restProps } = props;

  return (
    <div
      ref={ref}
      {...restProps}
      style={{
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        flexBasis: basis,
        flexGrow: grow,
        flexShrink: shrink,
      }}
    />
  );
});
