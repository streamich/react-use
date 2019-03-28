import { useRef, useEffect, useCallback } from 'react';

const useThrottle = (fn: () => any, ms: number = 0, args?) => {
  const lastRan = useRef(0);
  const timeout = useRef(0);

  const run = useCallback(() => {
    fn.apply(null, args);
    lastRan.current = Date.now();
  }, [fn, args]);

  useEffect(() => {
    clearTimeout(timeout.current);
    const diff = Date.now() - lastRan.current;

    if (diff >= ms) {
      run();
    } else {
      timeout.current = window.setTimeout(run, ms - diff);
    }

    return () => {
      clearTimeout(timeout.current);
    }
  }, args);
};

export default useThrottle;
