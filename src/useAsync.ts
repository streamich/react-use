import { DependencyList, useEffect } from 'react';
import useAsyncFn, { AsyncFnInput } from './useAsyncFn';

export { AsyncState, AsyncFn } from './useAsyncFn';

export default function useAsync<Result = any, Args extends any[] = any[]>(
  fn: AsyncFnInput<Result, Args>,
  deps: DependencyList = []
) {
  const [state, callback] = useAsyncFn<Result, Args>(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
