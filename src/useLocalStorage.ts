/* eslint-disable */
import { Dispatch, SetStateAction } from 'react';
import useStorage, { parserOptions } from './useStorage';

const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  return useStorage('localStorage', key, initialValue, options);
};

export default useLocalStorage;
