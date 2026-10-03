import { RefObject, useEffect, useState } from 'react';
import { off, on } from './misc/util';

const useScrolling = (ref: RefObject<HTMLElement>): boolean => {
  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      let scrollingTimeout;

      const handleScrollEnd = () => {
        setScrolling(false);
      };

      const handleScroll = () => {
        setScrolling(true);
        clearTimeout(scrollingTimeout);
        scrollingTimeout = setTimeout(() => handleScrollEnd(), 150);
      };

      on(element, 'scroll', handleScroll, false);
      return () => {
        off(element, 'scroll', handleScroll, false);
      };
    }
    return () => {};
  }, [ref]);

  return scrolling;
};

export default useScrolling;
