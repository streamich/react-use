import { isClient } from './util';
import { useMemo, useCallback, Dispatch, SetStateAction } from 'react';
import useEffectOnce from './useEffectOnce';

type parserOptions<T> =
  | {
      raw: true;
    }
  | {
      raw: false;
      serializer: (value: T) => string;
      deserializer: (value: string) => T;
    };

const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T, Dispatch<SetStateAction<T>>] => {
  if (!isClient || !localStorage) {
    return [initialValue as T, () => {}];
  }
  if ((!key && (key as any) !== 0) || (key as any) === false) {
    throw new Error('useLocalStorage key may not be nullish or undefined');
  }

  // @ts-ignore - These are allowed to be undefined
  const { raw, deserializer, serializer } = options || {};

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
      if (raw) return localStorageValue;
      if (!raw && deserializer) return deserializer(localStorageValue);
      return JSON.parse(localStorageValue);
    } catch {
      /* JSON.parse and JSON.stringify can throw. */
      return localStorageValue === null ? initialValue : localStorageValue;
    }
  }, [key, localStorageValue, raw, deserializer]);

  const setState: Dispatch<SetStateAction<T>> = useCallback(
    (valOrFunc: SetStateAction<T>): void => {
      try {
        let newState = typeof valOrFunc === 'function' ? (valOrFunc as Function)(state) : valOrFunc;
        newState = typeof newState === 'string' ? newState : (serializer || JSON.stringify)(newState);
        localStorage.setItem(key, newState);
      } catch {
        /**
         * If user is in private mode or has storage restriction
         * localStorage can throw. Also JSON.stringify can throw.
         */
      }
    },
    [state, raw, serializer]
  );

  /* If value hasn't been set yet (null not 'null') then initialize it. */
  useEffectOnce((): void => {
    if (localStorageValue === null && initialValue) setState(initialValue);
  });

  return [state, setState];
};

export default useLocalStorage;
