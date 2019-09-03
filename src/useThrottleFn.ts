import { useEffect, useRef, useState } from 'react';
import useUnmount from './useUnmount';

const useThrottleFn = <T, U extends any[]>(fn: (...args: U) => T, ms: number = 200, args: U) => {
  const [state, setState] = useState<T>(null as any);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
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
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutCallback, ms);
    } else {
      nextArgs.current = args;
      hasNextArgs.current = true;
    }
  }, args);

  useUnmount(() => {
    timeout.current && clearTimeout(timeout.current);
  });

  return state;
};

export default useThrottleFn;
