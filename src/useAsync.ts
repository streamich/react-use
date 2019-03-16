import { useState, useEffect, useCallback, useRef } from "react";

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

interface AsyncStateObject<T> {
  loading: boolean;
  error?: Error;
  value?: T;
}

interface AsyncRef {
  mounted: boolean;
  busy: boolean;
  attempt: number;
}

const useAsync = <T>(fn: () => Promise<T>, args?) => {
  const ref = useRef<AsyncRef>({ mounted: false, attempt: 0, busy: false });
  const [state, set] = useState<AsyncStateObject<T>>({
    loading: false
  });

  const memoized = useCallback(fn, args);

  const attemptAsync = useCallback(() => {
    // Abort new attempt if already busy
    if (ref.current.busy) {
      console.log("useAsync is currently busy, please wait!");
      return;
    }

    ref.current.busy = true;
    ref.current.attempt = ref.current.attempt + 1;

    set({
      loading: true
    });

    memoized().then(
      value => {
        if (ref.current.mounted) {
          ref.current.busy = false;
          set({
            loading: false,
            value
          });
        }
      },
      error => {
        if (ref.current.mounted) {
          ref.current.busy = false;
          set({
            loading: false,
            error
          });
        }
      }
    );
  }, [memoized]);

  useEffect(() => {
    ref.current.mounted = true;

    attemptAsync();

    return () => {
      ref.current.mounted = false;
    };
  }, [memoized]);

  return { ...state, retry: attemptAsync };
};

export default useAsync;
