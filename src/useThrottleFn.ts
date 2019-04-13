import { useEffect, useRef, useState } from 'react';
import useUnmount from './useUnmount';

const useThrottleFn = <T>(fn: (...args: any[]) => T, ms: number = 200, args: any[]) => {
  const [state, setState] = useState<T>(null as any);
  const timeout = useRef<any>(null);
  const nextArgs = useRef(null) as any;
  const hasNextArgs = useRef(false) as any;

  useEffect(() => {
    if (!timeout.current) {
      setState(fn(...args));
      const timeoutCallback = () => {
        if (hasNextArgs.current) {
          hasNextArgs.current = false;
          setState(fn(...nextArgs.current));
          timeout.current = setTimeout(timeoutCallback, ms);
        } else {
          timeout.current = null;
        }
      };
      timeout.current = setTimeout(timeoutCallback, ms);
    } else {
      nextArgs.current = args;
      hasNextArgs.current = true;
    }
  }, args);

  useUnmount(() => {
    clearTimeout(timeout.current);
  });

  return state;
};

export default useThrottleFn;
