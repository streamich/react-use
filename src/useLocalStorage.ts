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
  // TODO: !localStorage needed? What does isClient do?
  if (!isClient || !localStorage) {
    return [initialValue as T, () => {}];
  }
  if ((!key && (key as any) !== 0) || (key as any) === false) {
    throw new Error('useLocalStorage key may not be nullish or undefined');
  }

  // Use provided serializer/deserializer or the default ones
  const serializer = options ? (options.raw ? String : options.serializer) : JSON.stringify;
  const deserializer = options ? (options.raw ? String : options.deserializer || null) : JSON.parse;

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
      console.log({ localStorageValue, initialValue, deserializer });
      if (localStorageValue === null) return initialValue as T;
      return deserializer ? deserializer(localStorageValue) : localStorageValue;
    } catch {
      /* JSON.parse and JSON.stringify can throw. */
      return localStorageValue === null ? initialValue : localStorageValue;
    }
  }, [key, localStorageValue]);

  const setState: Dispatch<SetStateAction<T>> = useCallback(
    (valOrFunc: SetStateAction<T>): void => {
      try {
        let newState = typeof valOrFunc === 'function' ? (valOrFunc as Function)(state) : valOrFunc;
        newState = typeof newState === 'string' ? newState : serializer(newState);
        localStorage.setItem(key, newState);
      } catch {
        /**
         * If user is in private mode or has storage restriction
         * localStorage can throw. Also JSON.stringify can throw.
         */
      }
    },
    [state, serializer]
  );

  /* If value hasn't been set yet (null not 'null') then initialize it. */
  useEffectOnce((): void => {
    if (localStorageValue === null && initialValue) setState(initialValue);
  });

  return [state, setState];
};

export default useLocalStorage;
