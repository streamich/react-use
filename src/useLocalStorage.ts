import { useEffect, useState, useCallback } from 'react';
import { isClient } from './util';

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
const isUndefined = (value?: any): boolean => typeof value === 'undefined';

const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>, () => void] => {
  if (!isClient) {
    return [initialValue as T, noop, noop];
  }

  // Use provided serializer/deserializer or the default ones
  const serializer = options ? (options.raw ? String : options.serializer) : JSON.stringify;
  const deserializer = options ? (options.raw ? String : options.deserializer) : JSON.parse;

  const [state, setState] = useState<T | undefined>(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue !== null) {
        return deserializer(localStorageValue);
      } else {
        initialValue && localStorage.setItem(key, serializer(initialValue));
        return initialValue;
      }
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue;
    }
  });

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(undefined);
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
    }
  }, [key, setState]);

  useEffect(() => {
    if (isUndefined(state)) return;
    try {
      localStorage.setItem(key, serializer(state));
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. Also JSON.stringify can throw.
    }
  }, [state]);
  return [state, setState, remove];
};

export default useLocalStorage;
