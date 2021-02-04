import { useEffect, useRef } from 'react';
import { clearHarmonicInterval, setHarmonicInterval } from 'set-harmonic-interval';

const useHarmonicIntervalFn = (fn: Function, delay: number | null = 0) => {
  const latestCallback = useRef<Function>(() => {});

  useEffect(() => {
    latestCallback.current = fn;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setHarmonicInterval(() => latestCallback.current(), delay);
      return () => clearHarmonicInterval(interval);
    }
    return undefined;
  }, [delay]);
};

export default useHarmonicIntervalFn;
