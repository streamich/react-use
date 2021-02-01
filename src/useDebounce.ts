import { DependencyList, useEffect } from 'react';
import useTimeoutFn from './useTimeoutFn';

export type UseDebounceReturn = [() => boolean | null, () => void, () => void];

export default function useDebounce(fn: Function, ms: number = 0, deps: DependencyList = []): UseDebounceReturn {
  const [isReady, cancel, reset, flush] = useTimeoutFn(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel, flush];
}
