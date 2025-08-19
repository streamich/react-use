import { DependencyList, useEffect } from 'react';
import useAsyncFn from './useAsyncFn';
import { FunctionReturningPromise } from './misc/types';

export { AsyncState, AsyncFnReturn } from './useAsyncFn';

export default function useAsync<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = []
) {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    // catch an error to prevent propagating outside
    // hook will change own internal state
    callback().catch(() => {});
  }, [callback]);

  return state;
}
