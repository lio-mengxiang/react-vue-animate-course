import { useState, useCallback, useEffect } from 'react';

export function useElementScroll(elementRef: any) {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });

  const scrollTo = useCallback(
    (...args: any[]) => {
      if (!elementRef?.current) return;

      const el = elementRef.current;

      if (typeof args[0] === 'object') {
        el.scrollTo(args[0]);
      } else if (typeof args[0] === 'number' && typeof args[1] === 'number') {
        el.scrollTo(args[0], args[1]);
      } else {
        throw new Error(
          `Invalid arguments passed to scrollTo. See here for more info: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo`,
        );
      }
    },
    [elementRef],
  );

  useEffect(() => {
    if (!elementRef?.current) return;

    const el = elementRef.current;

    const handleScroll = () => {
      setState({
        x: el.scrollLeft,
        y: el.scrollTop,
      });
    };

    handleScroll(); // 初次调用，设置初始值

    el.addEventListener('scroll', handleScroll);

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef]);

  return [state, scrollTo];
}
