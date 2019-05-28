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

const useAsyncFn = <Result, Fn extends Function>(
  fn: Fn,
  deps: DependencyList = []
): [AsyncState<Result>, () => void] => {
  const [state, set] = useState<AsyncState<Result>>({
    loading: true,
  });

  const mounted = useRefMounted();

  const callback = useCallback((...args) => {
    set({ loading: true });

    fn(...args).then(
      value => {
        if (mounted.current) {
          set({ value, loading: false });
        }
      },
      error => {
        if (mounted.current) {
          set({ error, loading: false });
        }
      }
    );
  }, deps);

  return [state, callback];
};

export default useAsyncFn;
