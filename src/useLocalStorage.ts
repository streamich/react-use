import { useMemo, useCallback, Dispatch, SetStateAction } from 'react';
import { isClient } from './util';
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

const noop = () => {};

const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  if (!isClient || !localStorage) {
    return [initialValue as T, noop, noop];
  }
  if ((!key && (key as any) !== 0) || (key as any) === false) {
    throw new Error('useLocalStorage key may not be nullish or undefined');
  }

  // Use provided serializer / deserializer or the default ones.
  const serializer = options ? (options.raw ? String : options.serializer || JSON.stringify) : JSON.stringify;
  const deserializer = options ? (options.raw ? value => value : options.deserializer || JSON.parse) : JSON.parse;

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
      return deserializer(localStorageValue);
    } catch {
      /* JSON.parse and JSON.stringify can throw. */
      return localStorageValue === null ? initialValue : localStorageValue;
    }
  }, [key, localStorageValue, deserializer]);

  const setState: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (valOrFunc: SetStateAction<T | undefined>): void => {
      try {
        const value = typeof valOrFunc === 'function' ? (valOrFunc as Function)(state) : valOrFunc;
        localStorage.setItem(key, serializer(value));
      } catch {
        /**
         * If user is in private mode or has storage restriction
         * localStorage can throw. Also JSON.stringify can throw.
         */
      }
    },
    [state, serializer]
  );

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(undefined);
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
    }
  }, [key, setState]);

  /* If value hasn't been set yet (null not 'null') then initialize it. */
  useEffectOnce((): void => {
    if (localStorageValue === null && initialValue) setState(initialValue);
  });

  return [state, setState, remove];
};

export default useLocalStorage;
