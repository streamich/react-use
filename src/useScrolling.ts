import { RefObject, useEffect, useState } from 'react';
import { off, on } from './misc/util';

const useScrolling = (ref: RefObject<HTMLElement>): boolean => {
  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      let scrollingTimeout;

      const handleScrollEnd = () => {
        setScrolling(false);
      };

      const handleScroll = () => {
        setScrolling(true);
        clearTimeout(scrollingTimeout);
        scrollingTimeout = setTimeout(() => handleScrollEnd(), 150);
      };

      on(ref.current, 'scroll', handleScroll, false);
      return () => {
        if (ref.current) {
          off(ref.current, 'scroll', handleScroll, false);
        }
      };
    }
    return () => {};
  }, [ref]);

  return scrolling;
};

export default useScrolling;
