import { DependencyList, useEffect } from 'react';
import useAsyncFn from './useAsyncFn';

export { AsyncState, AsyncFn } from './useAsyncFn';

export default function useAsync<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps: DependencyList = []
) {
  const [state, callback] = useAsyncFn<Result, Args>(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    init();
  }, [callback]);

  async function init() {
    try {
      await callback();
    } catch {}
  }

  return state;
}
