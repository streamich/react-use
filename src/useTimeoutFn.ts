import { useCallback, useEffect, useRef } from 'react';

export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

export default function useTimeoutFn(fn: Function, ms: number = 0): UseTimeoutFnReturn {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const isReady = useCallback(() => ready.current, []);
  const set = useCallback(() => {
    ready.current = false;
    timeout.current = setTimeout(() => {
      ready.current = true;
      fn();
    }, ms);
  }, [ms, fn]);
  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    set();

    return clear;
  }, [ms]);

  return [isReady, clear, set];
}
