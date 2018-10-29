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
    let mounted = true;
    
    try {
      const value = await memoized();
      if (mounted) {
        set({
          loading: false,
          value,
        });
      }
    } catch (error) {
      if (mounted) {
        set({
          loading: false,
          error,
        });
      }
    }

    return () => {
      mounted = false;
    };
  }, [memoized]);

  return state;
};

export default useAsync;
