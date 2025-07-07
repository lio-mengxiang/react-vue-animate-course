import React from 'react';

export const Ellipse2 = ({
  pathProps,
  svgProps,
  rectProps,
}: {
  pathProps?: React.SVGProps<SVGPathElement>;
  svgProps?: React.SVGProps<SVGSVGElement>;
  rectProps?: React.SVGProps<SVGRectElement>;
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="395" viewBox="0 0 720 395" fill="none" {...svgProps}>
      <g>
        <path
          {...pathProps}
          d="M-12,198a372,172 0 1,0 744,0a372,172 0 1,0 -744,0"
          stroke="#C0C0C0"
          strokeDasharray="2 2"
          transform="rotate(16.9334 360.588 198.514)"
        />
        <rect width="30" height="12" rx="6" {...rectProps} />
      </g>
    </svg>
  );
};
