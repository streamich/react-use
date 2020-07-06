/* eslint-disable */
import { Dispatch, SetStateAction } from 'react';
import useStorage, { parserOptions } from './useStorage';

const useSessionStorage = <T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  return useStorage('sessionStorage', key, initialValue, options);
};

export default useSessionStorage;
