import React from 'react';

export const Ellipse3 = ({
  pathProps,
  svgProps,
  rectProps,
}: {
  pathProps?: React.SVGProps<SVGPathElement>;
  svgProps?: React.SVGProps<SVGSVGElement>;
  rectProps?: React.SVGProps<SVGRectElement>;
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="953" height="520" viewBox="0 0 953 520" fill="none" {...svgProps}>
      <path
        {...pathProps}
        d="M-15,261a492,226 0 1,0 984,0a492,226 0 1,0 -984,0"
        stroke="#C0C0C0"
        strokeDasharray="2 2"
        transform="rotate(16.9334 477.521 261.104)"
      />
      <rect width="30" height="12" rx="6" {...rectProps} />
    </svg>
  );
};
