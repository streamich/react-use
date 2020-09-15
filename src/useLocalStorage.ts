import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import useLatest from './useLatest';
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

const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  if (!isClient) {
    return [initialValue as T, noop, noop];
  }
  if (!key) {
    throw new Error('useLocalStorage key may not be falsy');
  }

  const deserializer = options ? (options.raw ? (value) => value : options.deserializer) : JSON.parse;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<T | undefined>(() => {
    try {
      const serializer = options ? (options.raw ? String : options.serializer) : JSON.stringify;

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const latestState = useLatest(state);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (valOrFunc) => {
      try {
        const newState = typeof valOrFunc === 'function' ? (valOrFunc as Function)(latestState.current) : valOrFunc;

        if (newState === undefined) {
          return;
        }

        const getValue = () => {
          if (options?.raw) {
            return typeof newState === 'string' ? newState : JSON.stringify(newState);
          }

          if (options?.serializer) {
            return options.serializer(newState);
          }

          return JSON.stringify(newState);
        };

        const value = getValue();

        localStorage.setItem(key, value);
        setState(deserializer(value));
      } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. Also JSON.stringify can throw.
      }
    },
    [key, setState, latestState]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(undefined);
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
    }
  }, [key, setState]);

  return [state, set, remove];
};

export default useLocalStorage;
