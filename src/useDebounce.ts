import { DependencyList, useCallback } from 'react';
import useTimeoutFn from './useTimeoutFn';

export default function useDebounce(fn: (...args: any[]) => any, ms: number = 0, args: DependencyList = []) {
  const cb = useCallback(fn, args);
  const [, cancel] = useTimeoutFn(cb, ms);

  return [cancel];
}
