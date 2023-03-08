import { useEffect, useRef } from 'react';

type Callback = () => VoidFunction | void;

const useInterval = (callback: Callback, delay?: number | null) => {
  const savedCallback = useRef<Callback>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      let cleanup: VoidFunction | void;

      const interval = setInterval(() => {
        if (cleanup) cleanup();
        cleanup = savedCallback.current();
      }, delay || 0);

      return () => {
        if (cleanup) cleanup();
        clearInterval(interval);
      };
    }

    return undefined;
  }, [delay]);
};

export default useInterval;
