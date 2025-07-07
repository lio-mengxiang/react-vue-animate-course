import React, { useCallback, useLayoutEffect, useState } from 'react';

export function useWindowScroll() {
  const [state, setState] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const scrollTo = useCallback((...args: any[]) => {
    if (typeof args[0] === 'object') {
      window.scrollTo(args[0]);
    } else if (typeof args[0] === 'number' && typeof args[1] === 'number') {
      window.scrollTo(args[0], args[1]);
    } else {
      throw new Error(
        `Invalid arguments passed to scrollTo. See here for more info. https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo`,
      );
    }
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [state, scrollTo];
}
