import { useState, useEffect, useCallback, DependencyList } from 'react';
import useAsyncCallback from "./useAsyncCallback"

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

const useAsync = <T>(fn: () => Promise<T>, deps: DependencyList = []) => {
  const [state, callback] = useAsyncCallback(fn, deps);

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
};

export default useAsync;
