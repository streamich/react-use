import { DependencyList, useCallback, useState } from 'react';
import useAsync, { AsyncState } from './useAsync';

export type AsyncStateRetry<T> = AsyncState<T> & {
  retry(): void;
};

const useAsyncRetry = <T>(fn: () => Promise<T>, deps: DependencyList = []) => {
  const [attempt, setAttempt] = useState<number>(0);
  const state = useAsync(fn, [...deps, attempt]);

  const stateLoading = state.loading;
  const retry = useCallback(() => {
    if (stateLoading) {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          'You are calling useAsyncRetry hook retry() method while loading in progress, this is a no-op.'
        );
      }

      return;
    }

    setAttempt((currentAttempt) => currentAttempt + 1);
  }, [...deps, stateLoading]);

  return { ...state, retry };
};

export default useAsyncRetry;
