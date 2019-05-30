import { DependencyList, useCallback, useState } from 'react';
import useRefMounted from './useRefMounted';

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

export default function useAsyncFn<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps: DependencyList = [],
  initialState: AsyncState<Result> = { loading: false }
): [AsyncState<Result>, (...args: Args | []) => Promise<Result>] {
  const [state, set] = useState<AsyncState<Result>>(initialState);

  const mounted = useRefMounted();

  const callback = useCallback((...args: Args | []) => {
    set({ loading: true });

    return fn(...args).then(
      value => {
        if (mounted.current) {
          set({ value, loading: false });
        }

        return value;
      },
      error => {
        if (mounted.current) {
          set({ error, loading: false });
        }

        return error;
      }
    );
  }, deps);

  return [state, callback];
}
