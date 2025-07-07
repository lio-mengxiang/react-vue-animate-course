import React from 'react';

export const Ellipse1 = ({
  pathProps,
  svgProps,
  rectProps,
}: {
  pathProps?: React.SVGProps<SVGPathElement>;
  svgProps?: React.SVGProps<SVGSVGElement>;
  rectProps?: React.SVGProps<SVGRectElement>;
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="554" height="296" viewBox="0 0 554 296" fill="none" {...svgProps}>
      <g>
        <path
          {...pathProps}
          d="M-9,148a286,127 0 1,0 572,0a286,127 0 1,0 -572,0"
          stroke="#C0C0C0"
          strokeDasharray="2 2"
          transform="rotate(16.9334 277.82 148.18)"
        />
        <rect width="30" height="12" rx="6" {...rectProps} />
      </g>
    </svg>
  );
};
