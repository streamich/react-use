import { DependencyList, useCallback, useState } from 'react';
import useMountedState from './useMountedState';

export type AsyncState<T> =
  | {
      loading: true;
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

export type AsyncFn<Result = any, Args extends any[] = any[], InitialState = Result> = [
  AsyncState<Result | InitialState>,
  (...args: Args | []) => Promise<Result>
];

// initialState with value: returns AsyncFn<Result, Args>
function useAsyncFn<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps: DependencyList | undefined,
  initialState: AsyncState<Result>
): AsyncFn<Result, Args>;

// initialState without value: returns AsyncFn<Result, Args, undefined>
// also the case when no initialState is provided
function useAsyncFn<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps?: DependencyList,
  initialState?: AsyncState<Result | undefined>
): AsyncFn<Result, Args, undefined>;

// implementation
function useAsyncFn<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps: DependencyList = [],
  initialState: AsyncState<Result> | AsyncState<Result | undefined> = { loading: false, value: undefined }
): AsyncFn<Result, Args> | AsyncFn<Result, Args, undefined> {
  const [state, set] = useState(initialState);

  const isMounted = useMountedState();

  const callback = useCallback((...args: Args | []) => {
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
    );
  }, deps);

  return [state, callback];
}

export default useAsyncFn;
