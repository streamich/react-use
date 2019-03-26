import { useRef, useEffect } from 'react';

const useThrottle = (fn: () => any, ms: number = 0, args?) => {
  const lastRan = useRef(0);

  useEffect(() => {
    let timeout
    const diff = Date.now() - lastRan.current

    if (diff >= ms) {
      fn.apply(null, args);
      lastRan.current = Date.now();
    } else {
      timeout = setTimeout(() => {
        fn.apply(null, args);
        lastRan.current = Date.now();
      }, ms - diff)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, args);
};

export default useThrottle;
