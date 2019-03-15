import {useCallback} from 'react';
import useRefMounted from './useRefMounted';

export type UsePromise = () => <T>(promise: Promise<T>) => Promise<T>;

const usePromise: UsePromise = () => {
  const refMounted = useRefMounted();
  return useCallback(<T>(promise: Promise<T>): Promise<T> =>
    new Promise<T>((resolve, reject) => {
      promise.then(value => {
        if (refMounted.current) {
          resolve(value);
        }
      }, error => {
        if (refMounted.current) {
          reject(error);
        }
      })
    }), []);
};

export default usePromise;
