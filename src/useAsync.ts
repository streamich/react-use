import { DependencyList, useEffect, useMemo, useRef } from 'react';
import useAsyncFn from './useAsyncFn';
import { FnReturningPromise } from './util';

export { AsyncState, AsyncFnReturn } from './useAsyncFn';

export default function useAsync<T extends FnReturningPromise>(fn: T, deps: DependencyList = []) {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });
  // Keep track of the deps for which the current output is based on
  const refDepsLoading = useRef<DependencyList>([]);

  useEffect(() => {
    // we started loading for the new set of dependencies
    refDepsLoading.current = deps;
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, callback]);

  return useMemo(() => {
    const allDependenciesEqual = deps.every((dep, i) => {
      return refDepsLoading.current[i] === dep;
    });

    return {
      ...state,
      // loading should be true when there is a mismatch between the given deps, and the deps we were last loading
      loading: state.loading || !allDependenciesEqual,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, state]);
}
