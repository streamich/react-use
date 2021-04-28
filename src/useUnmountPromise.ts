import { useMemo } from 'react';
import useMountedState from './useMountedState';

export type Race = <P extends Promise<any>, E = any>(promise: P, onError?: (error: E) => void) => P;

const useUnmountPromise = (): Race => {
  const isMounted = useMountedState();

  const wrapper = useMemo(() => {
    const race = <P extends Promise<any>, E>(promise: P, onError?: (error: E) => void) => {
      const newPromise: P = new Promise((resolve, reject) => {
        promise.then(
          (result) => {
            if (isMounted()) resolve(result);
          },
          (error) => {
            if (isMounted()) reject(error);
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
