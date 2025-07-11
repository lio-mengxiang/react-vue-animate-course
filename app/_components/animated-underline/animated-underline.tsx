import React from 'react';
export const AnimatedUnderline = ({ text }: { text: string }) => {
  return (
    <div className="relative after:absolute after:bg-primary after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
      <span className="text-primary">{text}</span>
    </div>
  );
};
