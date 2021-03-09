import { useCallback, useEffect, useMemo, useRef } from 'react';

export type RafLoopReturns = [() => void, () => void, () => boolean];

export default function useRafLoop(
  callback: FrameRequestCallback,
  initiallyActive = true
): RafLoopReturns {
  const raf = useRef<number | null>(null);
  const rafActivity = useRef<boolean>(false);
  const rafCallback = useRef(callback);
  rafCallback.current = callback;

  const step = useCallback((time: number) => {
    if (rafActivity.current) {
      rafCallback.current(time);
      raf.current = requestAnimationFrame(step);
    }
  }, []);

  const result = useMemo(
    () =>
      [
        () => {
          // stop
          if (rafActivity.current) {
            rafActivity.current = false;
            raf.current && cancelAnimationFrame(raf.current);
          }
        },
        () => {
          // start
          if (!rafActivity.current) {
            rafActivity.current = true;
            raf.current = requestAnimationFrame(step);
          }
        },
        (): boolean => rafActivity.current, // isActive
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ] as RafLoopReturns,
    []
  );

  useEffect(() => {
    if (initiallyActive) {
      result[1]();
    }

    return result[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return result;
}
