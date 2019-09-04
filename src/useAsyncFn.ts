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

export type FnReturningPromise = (...args: any[]) => Promise<any>;
export type AsyncFnReturn<T extends FnReturningPromise = FnReturningPromise> = [AsyncState<ReturnType<T>>, T];

export default function useAsync<T extends FnReturningPromise>(
  fn: T,
  deps: DependencyList = [],
  initialState: AsyncState<ReturnType<T>> = { loading: false }
): AsyncFnReturn<T> {
  const isMounted = useMountedState();
  const [state, set] = useState<AsyncState<ReturnType<T>>>(initialState);

  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    set({ loading: true });

    return fn(...args).then(
      value => {
        isMounted() && set({ value, loading: false });

        return value;
      },
      error => {
        isMounted() && set({ error, loading: false });

        return error;
      }
    ) as ReturnType<T>;
  }, deps);

  return [state, (callback as unknown) as T];
}
