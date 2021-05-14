import { DependencyList, useEffect } from 'react';
import useAsyncFn from './useAsyncFn.js';
import { FunctionReturningPromise } from './misc/types.js';

export { AsyncState, AsyncFnReturn } from './useAsyncFn.js';

export default function useAsync<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = []
) {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
