import React from 'react';
import Image from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  style?: React.CSSProperties;
}

export function ImageTypography(props: ImageProps) {
  return (
    <div className="w-full h-96 relative mt-8 mb-8">
      <Image {...props} className="object-cover" />
    </div>
  );
}
