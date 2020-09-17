import { useMemo, useRef, useEffect } from 'react';

export type Race = <P extends Promise<any>, E = any>(promise: P, onError?: (error: E) => void) => P;

const useUnmountPromise = (): Race => {
  const refUnmounted = useRef(false);
  useEffect(() => () => {
    refUnmounted.current = true;
  });

  const wrapper = useMemo(() => {
    const race = <P extends Promise<any>, E>(promise: P, onError?: (error: E) => void) => {
      const newPromise: P = new Promise((resolve, reject) => {
        promise.then(
          (result) => {
            if (!refUnmounted.current) resolve(result);
          },
          (error) => {
            if (!refUnmounted.current) reject(error);
            else if (onError) onError(error);
            else console.error('useUnmountPromise', error);
          }
        );
      }) as P;
      return newPromise;
    };
    return race;
  }, []);

  return wrapper;
};

export default useUnmountPromise;
