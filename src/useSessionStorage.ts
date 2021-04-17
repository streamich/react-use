/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useMemo, Dispatch, SetStateAction } from 'react';
import { isBrowser, noop } from './misc/util';

type parserOptions<T> =
  | true
  | {
      raw: true;
    }
  | {
      raw: false;
      serializer: (value: T) => string;
      deserializer: (value: string) => T;
    };

export default function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options?: parserOptions<T>
): [T, Dispatch<SetStateAction<T>>, () => void];
export default function useSessionStorage<T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T>>, () => void];
export default function useSessionStorage<T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T>>, () => void] {
  if (!isBrowser) {
    return [initialValue as T, noop, noop];
  }
  if (!key) {
    throw new Error('useSessionStorage key may not be falsy');
  }

  const deserializer = useMemo(
    () => (options ? (options === true || options.raw ? (value: string) => value : options.deserializer) : JSON.parse),
    [options]
  );

  const serializer = useMemo(
    () =>
      options
        ? options === true || options.raw
          ? (value: unknown) => (typeof value === 'string' ? value : JSON.stringify(value))
          : options.serializer
        : JSON.stringify,
    [options]
  );

  const [state, setState] = useState<T | undefined>(() => {
    try {
      const sessionStorageValue = sessionStorage.getItem(key);
      if (sessionStorageValue !== null) {
        return deserializer(sessionStorageValue);
      } else {
        initialValue && sessionStorage.setItem(key, serializer(initialValue));
        return initialValue;
      }
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue;
    }
  });

  const set: Dispatch<SetStateAction<T>> = useCallback(
    (valOrFunc) => {
      setState((prevState) => {
        const newState = typeof valOrFunc === 'function' ? (valOrFunc as Function)(prevState) : valOrFunc;
        if (typeof newState === 'undefined') return;

        try {
          const value = serializer(newState);

          sessionStorage.setItem(key, value);
          return deserializer(value);
        } catch {
          // If user is in private mode or has storage restriction
          // sessionStorage can throw. Also JSON.stringify can throw.
          return prevState;
        }
      });
    },
    [key, serializer, deserializer]
  );

  const remove = useCallback(() => {
    try {
      sessionStorage.removeItem(key);
      setState(initialValue);
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw.
    }
  }, [initialValue, key]);

  return [state, set, remove];
}
