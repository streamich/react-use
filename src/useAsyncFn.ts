/* eslint-disable */
import { DependencyList, useCallback, useState, useRef } from 'react';
import useMountedState from './useMountedState';

export type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

export type AsyncFn<Result, Args extends unknown[]> = [
  AsyncState<Result>,
  (...args: Args) => Promise<Result>
];

export default function useAsyncFn<Result, Args extends unknown[]>(
  fn: (...args: Args) => Promise<Result>,
  deps: DependencyList = [],
  initialState: AsyncState<Result> = { loading: false }
): AsyncFn<Result, Args> {
  const lastCallId = useRef(0);
  const [state, set] = useState<AsyncState<Result>>(initialState);

  const isMounted = useMountedState();

  const callback = useCallback((...args: Args) => {
    const callId = ++lastCallId.current;
    set({ loading: true });

    return fn(...args).then(
      value => {
        isMounted() && callId === lastCallId.current && set({ value, loading: false });

        return value;
      },
      error => {
        isMounted() && callId === lastCallId.current && set({ error, loading: false });

        return error;
      }
    );
  }, deps);

  return [state, callback];
}
