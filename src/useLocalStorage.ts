import { isClient } from './util';
import { useMemo, useCallback, useEffect, Dispatch, SetStateAction } from 'react';

const useLocalStorage = <T extends any>(
  key: string,
  initialValue?: any,
  raw?: boolean
): [any, Dispatch<SetStateAction<any>>] => {
  if (!isClient || !localStorage) {
    return [initialValue as T, () => {}];
  }

  let localStorageValue: string | null = null;
  try {
    localStorageValue = localStorage.getItem(key);
  } catch {
    // If user is in private mode or has storage restriction
    // localStorage can throw.
    localStorageValue = initialValue;
  }

  const state = useMemo(() => {
    try {
      if (localStorageValue === null) return initialValue; // key hasn't been set yet
      return raw ? localStorageValue : JSON.parse(localStorageValue);
    } catch {
      /* JSON.parse and JSON.stringify can throw. */
      return localStorageValue === null ? initialValue : localStorageValue;
    }
  }, [key, localStorageValue, initialValue]);

  const setState = useCallback(
    (valOrFunc: any) => {
      try {
        let newState = typeof valOrFunc === 'function' ? valOrFunc(state) : valOrFunc;
        newState = typeof newState === 'string' ? newState : JSON.stringify(newState);
        localStorage.setItem(key, newState);
      } catch {
        /**
         * If user is in private mode or has storage restriction
         * localStorage can throw. Also JSON.stringify can throw.
         */
      }
    },
    [state, raw]
  );

  useEffect(() => {
    if (localStorageValue === null) setState(initialValue);
  }, [localStorageValue, setState]);

  return [state as any, setState];
};

export default useLocalStorage;
