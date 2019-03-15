import {useCallback} from 'react';
import useRefMounted from './useRefMounted';

export type UsePromise = <T>() => (promise: Promise<T>) => Promise<T>;

const usePromise: UsePromise = () => {
  const refMounted = useRefMounted();
  return useCallback((promise: Promise<any>) =>
    new Promise<any>((resolve, reject) => {
      const onValue = value => {
        if (refMounted.current) {
          resolve(value);
        }
      };
      const onError = error => {
        if (refMounted.current) {
          reject(error);
        }
      };
      promise.then(onValue, onError)
    }), []);
};

export default usePromise;
