import { DependencyList, useCallback, useState } from 'react';
import useMountedState from './useMountedState';

export type AsyncState<T> =
  | {
      loading: true;
      error?: undefined;
      value?: undefined;

      [key: string]: any;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;

      [key: string]: any;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;

      [key: string]: any;
    };

export type AsyncFn<Result = any, Args extends any[] = any[]> = [
  AsyncState<Result>,
  (...args: Args | []) => Promise<Result>
];

export default function useAsyncFn<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps: DependencyList = [],
  initialState: AsyncState<Result> = { loading: false } as AsyncState<Result>
): AsyncFn<Result, Args> {
  const [state, set] = useState<AsyncState<Result>>(initialState);

  const isMounted = useMountedState();

  const callback = useCallback((...args: Args | []) => {
    set(prevState => ({ ...prevState, loading: true } as AsyncState<Result>));

    return fn(...args).then(
      value => {
        isMounted() && set(prevState => ({ ...prevState, loading: false, value } as AsyncState<Result>));

        return value;
      },
      error => {
        isMounted() && set(prevState => ({ ...prevState, loading: false, error } as AsyncState<Result>));

        return error;
      }
    );
  }, deps);

  return [state, callback];
}
