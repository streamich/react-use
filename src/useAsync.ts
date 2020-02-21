import { DependencyList, useEffect } from 'react';
import useAsyncFn from './useAsyncFn';

export { AsyncState, AsyncFn } from './useAsyncFn';

export default function useAsync<Result = any>(
  fn: () => Promise<Result>,
  deps: DependencyList = []
) {
  const [state, callback] = useAsyncFn<Result>(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
