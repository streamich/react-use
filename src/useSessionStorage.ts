import { useState, useCallback, Dispatch, SetStateAction } from 'react';
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

  const deserializer = options
    ? options === true || options.raw
      ? (value) => value
      : options.deserializer
    : JSON.parse;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<T | undefined>(() => {
    try {
      const serializer = options ? (options === true || options.raw ? String : options.serializer) : JSON.stringify;

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const set: Dispatch<SetStateAction<T>> = useCallback(
    (valOrFunc) => {
      setState((prevState) => {
        const newState = typeof valOrFunc === 'function' ? (valOrFunc as Function)(prevState) : valOrFunc;
        if (typeof newState === 'undefined') return;
        let value: string;

        try {
          if (options)
            if (options.raw)
              if (typeof newState === 'string') value = newState;
              else value = JSON.stringify(newState);
            else if (options.serializer) value = options.serializer(newState);
            else value = JSON.stringify(newState);
          else value = JSON.stringify(newState);

          sessionStorage.setItem(key, value);
          return deserializer(value);
        } catch {
          // If user is in private mode or has storage restriction
          // sessionStorage can throw. Also JSON.stringify can throw.
          return prevState;
        }
      });
    },
    [key, setState]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const remove = useCallback(() => {
    try {
      sessionStorage.removeItem(key);
      setState(initialValue);
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw.
    }
  }, [key, setState]);

  return [state, set, remove];
}
