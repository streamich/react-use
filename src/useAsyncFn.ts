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

export type AsyncFnInput<Result = any, Args extends any[] = any[]> =
  Args extends [] ? (() => Promise<Result>) : ((...args: Args) => Promise<Result>);

export type AsyncFn<Result = any, Args extends any[] = any[]> = [
  AsyncState<Result>,
  AsyncFnInput<Result, Args>
];

export default function useAsyncFn<Result = any, Args extends any[] = any[]>(
  fn: AsyncFnInput<Result, Args>,
  deps: DependencyList = [],
  initialState: AsyncState<Result> = { loading: false }
): AsyncFn<Result, Args> {
  const lastCallId = useRef(0);
  const [state, set] = useState<AsyncState<Result>>(initialState);

  const isMounted = useMountedState();

  const callback = useCallback(((...args) => {
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
  }) as AsyncFnInput<Result, Args>, deps);

  return [state, callback];
}
