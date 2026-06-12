import { useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

// setTimeout max delay is a 32-bit signed int (2147483647ms ~24.8 days).
// Values above this overflow and fire immediately. See: https://github.com/streamich/react-use/issues/779
const MAX_SAFE_TIMEOUT = 2147483647;

const useRaf = (ms: number = 1e12, delay: number = 0): number => {
  const [elapsed, set] = useState<number>(0);

  useIsomorphicLayoutEffect(() => {
    let raf;
    let timerStop;
    let start;

    const onFrame = () => {
      const time = Math.min(1, (Date.now() - start) / ms);
      set(time);
      loop();
    };
    const loop = () => {
      raf = requestAnimationFrame(onFrame);
    };
    const onStart = () => {
      if (ms <= MAX_SAFE_TIMEOUT) {
        timerStop = setTimeout(() => {
          cancelAnimationFrame(raf);
          set(1);
        }, ms);
      }
      start = Date.now();
      loop();
    };
    const timerDelay = setTimeout(onStart, delay);

    return () => {
      clearTimeout(timerStop);
      clearTimeout(timerDelay);
      cancelAnimationFrame(raf);
    };
  }, [ms, delay]);

  return elapsed;
};

export default useRaf;
