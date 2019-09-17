import { DependencyList, useCallback, useState } from 'react';
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

export type AsyncFn<Result = any, Args extends any[] = any[]> = [
  AsyncState<Result>,
  (...args: Args | []) => Promise<Result>
];

export default function useAsyncFn<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps: DependencyList = [],
  initialState: AsyncState<Result> = { loading: false }
): AsyncFn<Result, Args> {
  const [state, set] = useState<AsyncState<Result>>(initialState);

  const isMounted = useMountedState();

  const callback = useCallback((...args: Args | []) => {
    set({ loading: true });

    return fn(...args).then(
      value => {
        isMounted() && set({ value, loading: false });

        return Promise.resolve(value);
      },
      error => {
        isMounted() && set({ error, loading: false });

        return Promise.reject(error);
      }
    );
  }, deps);

  return [state, callback];
}
