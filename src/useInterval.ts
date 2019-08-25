import { useEffect, useRef } from 'react';

const useInterval = (callback: Function, delay?: number | null) => {
  const latestCallback = useRef<Function>(() => {});

  useEffect(() => {
    latestCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => latestCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [delay]);
};

export default useInterval;
