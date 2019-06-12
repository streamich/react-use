import { DependencyList, useCallback, useState } from 'react';
import useRefMounted from './useRefMounted';

export type AsyncState<T> =
  | {
      loading: true;
      value?: T;
    }
  | {
      loading: false;
      error?: any;
      value?: T;
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

  const mounted = useRefMounted();

  const callback = useCallback((...args: Args | []) => {
    set({
      ...state,
      loading: true,
    });

    return fn(...args).then(
      value => {
        if (mounted.current) {
          set({ value, loading: false });
        }

        return value;
      },
      error => {
        if (mounted.current) {
          set({
            ...state,
            error,
            loading: false,
          });
        }

        return error;
      }
    );
  }, deps);

  return [state, callback];
}
