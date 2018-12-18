import {useState, useEffect, useCallback} from 'react';

export type AsyncState<T> =
| {
  loading: true;
  error?: undefined;
  value?: undefined;
}
| {
  loading: false;
  error: Error;
  value?: undefined;
}
| {
  loading: false;
  error?: undefined;
  value: T;
};

const useAsync = <T>(fn: () => Promise<T>, args?) => {
  const [state, set] = useState<AsyncState<T>>({
    loading: true,
  });
  const memoized = useCallback(fn, args);

  useEffect(() => {
    let mounted = true;
    const promise = memoized.apply(this, args);

    promise
      .then(value => {
        if (mounted) {
          set({
            loading: false,
            value,
          });
        }
      }, error => {
        if (mounted) {
          set({
            loading: false,
            error,
          });
        }
      });

    return () => {
      mounted = false;
    };
  }, [memoized]);

  return state;
};

export default useAsync;
