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

const useAsync = <Result, Fn extends Function>(fn: Fn, deps: DependencyList = []) => {
  const [state, callback] = useAsyncFn<Result, Fn>(fn, deps);

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
};

export default useAsync;
