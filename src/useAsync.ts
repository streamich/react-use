import { DependencyList, useEffect } from 'react';
import useAsyncFn from './useAsyncFn';

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

export default function useAsync<
  Result,
  T = any,
  Args extends T[] = any[],
  Fn extends Function = (...args: Args) => Promise<Result>
>(fn: Fn, deps: DependencyList = []) {
  const [state, callback] = useAsyncFn<Result, T, Args, Fn>(fn, deps);

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
