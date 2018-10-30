import {useState, useEffect, useCallback} from './react';

export interface AsyncState<T> {
  loading: boolean;
  error?: Error | any;
  value?: T;
}

const useAsync = <T>(fn: () => Promise<T>, args?) => {
  const [state, set] = useState<AsyncState<T>>({
    loading: true,
  });
  const memoized = useCallback(fn, args);

  useEffect(async () => {
   
    try {
      const value = await memoized();
      set({
        loading: false,
        value,
      });
    } catch (error) {
      set({
        loading: false,
        error,
      });
    }
  }, [memoized]);

  return state;
};

export default useAsync;
