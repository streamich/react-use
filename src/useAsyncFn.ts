import { DependencyList, useCallback, useState } from 'react';
import useMountedState from './useMountedState';
import { FnReturningPromise, PromiseType } from './util';

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

type StateFromFnReturningPromise<T extends FnReturningPromise> = AsyncState<PromiseType<ReturnType<T>>>;

export type AsyncFnReturn<T extends FnReturningPromise = FnReturningPromise> = [StateFromFnReturningPromise<T>, T];

export default function useAsyncFn<T extends FnReturningPromise>(
  fn: T,
  deps: DependencyList = [],
  initialState: StateFromFnReturningPromise<T> = { loading: false }
): AsyncFnReturn<T> {
  const isMounted = useMountedState();
  const [state, set] = useState<StateFromFnReturningPromise<T>>(initialState);

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
