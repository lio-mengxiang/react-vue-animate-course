import React, { memo, useCallback, useMemo, useRef } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import { useDimensions } from './use-debounced-dimensions';
import { cs } from '@/_utils';

interface PixelTrailProps {
  pixelSize: number; // px
  fadeDuration?: number; // ms
  delay?: number; // ms
  className?: string;
  pixelClassName?: string;
}

function generateRandomId(length = 8) {
  return Math.random().toString(36).substr(2, length);
}

/**
 * 本质就是块状移动 + svg filter
 */
export const PixelTrail: React.FC<PixelTrailProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) => {
  const containerRef = useRef<any>(null);
  // useDimensions 获取 container 宽高
  const dimensions = useDimensions(containerRef);
  const trailId = useRef(generateRandomId());

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // 找到对应的块
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);

      const pixelElement = document.getElementById(`${trailId.current}-pixel-${x}-${y}`);

      if (pixelElement) {
        const animatePixel = (pixelElement as any).__animatePixel;
        if (animatePixel) animatePixel();
      }
    },
    [pixelSize],
  );

  const columns = useMemo(() => Math.ceil(dimensions.width / pixelSize), [dimensions.width, pixelSize]);
  const rows = useMemo(() => Math.ceil(dimensions.height / pixelSize), [dimensions.height, pixelSize]);

  return (
    <div
      ref={containerRef}
      className={cs('absolute inset-0 w-full h-full pointer-events-auto', className)}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface PixelDotProps {
  id: string;
  size: number;
  fadeDuration: number;
  delay: number;
  className?: string;
}

const PixelDot: React.FC<PixelDotProps> = memo(({ id, size, fadeDuration, delay, className }: any) => {
  const controls = useAnimationControls();

  const animatePixel = useCallback(() => {
    controls.start({
      opacity: [1, 0],
      transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
    });
  }, [controls, delay, fadeDuration]);

  // Attach the animatePixel function to the DOM element
  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        (node as any).__animatePixel = animatePixel;
      }
    },
    [animatePixel],
  );

  return (
    <motion.div
      id={id}
      ref={ref}
      className={cs('cursor-pointer-none', className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ opacity: 0 }}
      animate={controls}
      exit={{ opacity: 0 }}
    />
  );
});

// https://www.youtube.com/watch?v=_Cc-dMVD2vs
