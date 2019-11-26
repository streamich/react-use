import { isClient } from './util';
import { useMemo, useCallback, Dispatch, SetStateAction } from 'react';
import useEffectOnce from './useEffectOnce';

const useLocalStorage = <T>(key: string, initialValue?: T, raw?: boolean): [T, Dispatch<SetStateAction<T>>] => {
  if (!isClient || !localStorage) {
    return [initialValue as T, () => {}];
  }
  if (!key && (key as any) !== 0) {
    throw new Error('useLocalStorage key may not be nullish or undefined');
  }

  let localStorageValue: string | null = null;
  try {
    localStorageValue = localStorage.getItem(key);
  } catch {
    // If user is in private mode or has storage restriction
    // localStorage can throw.
  }

  const state: T = useMemo(() => {
    try {
      /* If key hasn't been set yet */
      if (localStorageValue === null) return initialValue as T;
      return raw ? localStorageValue : JSON.parse(localStorageValue);
    } catch {
      /* JSON.parse and JSON.stringify can throw. */
      return localStorageValue === null ? initialValue : localStorageValue;
    }
  }, [key, localStorageValue]);

  const setState: Dispatch<SetStateAction<T>> = useCallback(
    (valOrFunc: SetStateAction<T>): void => {
      try {
        let newState = typeof valOrFunc === 'function' ? (valOrFunc as Function)(state) : valOrFunc;
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

  /* If value hasn't been set yet (null not 'null') then initialize it. */
  useEffectOnce((): void => {
    if (localStorageValue === null && initialValue) setState(initialValue);
  });

  return [state, setState];
};

export default useLocalStorage;
