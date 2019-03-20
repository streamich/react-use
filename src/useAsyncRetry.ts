import { useCallback, useState } from 'react';
import useAsync from './useAsync';

const useAsyncRetry = <T>(fn: () => Promise<T>, args: any[] = []) => {
  const [attempt, setAttempt] = useState<number>(0);
  const memoized = useCallback(async () => await fn(), [...args, attempt]);
  const state = useAsync(memoized);

  const retry = useCallback(() => {
    if (state.loading) {
      if (process.env.NODE_ENV === 'development') {
        console.log('You are calling useAsyncRetry hook retry() method while loading in progress, this is a no-op.');
      }
      return;
    }
    setAttempt(attempt + 1);
  }, [memoized, state, attempt]);

  return { ...state, retry };
};

export default useAsyncRetry;
