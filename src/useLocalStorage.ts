import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react';
import { isBrowser, noop, off, on } from './misc/util';

type parserOptions<T> =
  | {
      raw: true;
    }
  | {
      raw: false;
      serializer: (value: T) => string;
      deserializer: (value: string) => T;
    };
const STORAGE_EVENT = 'local-storage-change';
const storageLinsters = new Map<string, Set<(value: any) => void>>();
const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  if (!isBrowser) {
    return [initialValue as T, noop, noop];
  }
  if (!key) {
    throw new Error('useLocalStorage key may not be falsy');
  }

  const deserializer = options
    ? options.raw
      ? (value) => value
      : options.deserializer
    : JSON.parse;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initializer = useRef((key: string) => {
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
  const [state, setState] = useState<T | undefined>(() => initializer.current(key));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => setState(initializer.current(key)), [key]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (valOrFunc) => {
      try {
        const newState =
          typeof valOrFunc === 'function' ? (valOrFunc as Function)(state) : valOrFunc;
        if (typeof newState === 'undefined') return;
        let value: string;

        if (options)
          if (options.raw)
            if (typeof newState === 'string') value = newState;
            else value = JSON.stringify(newState);
          else if (options.serializer) value = options.serializer(newState);
          else value = JSON.stringify(newState);
        else value = JSON.stringify(newState);

        localStorage.setItem(key, value);
        setState(deserializer(value));

        storageLinsters.get(key)?.forEach((listener) => listener(newState));
        window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key, newValue: value } }));
      } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. Also JSON.stringify can throw.
      }
    },
    [key, setState]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(undefined);

      storageLinsters.get(key)?.forEach((listener) => listener(undefined));
      window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key, newValue: null } }));
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
    }
  }, [key, setState]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleStorageChange = (e: CustomEvent) => {
      if (e instanceof StorageEvent && e.key === key) {
        const newValue = e.newValue ? deserializer(e.newValue) : undefined;
        setState(newValue);
      } else if (e instanceof CustomEvent && e.detail?.key === key) {
        const newValue = e.detail.newValue ? deserializer(e.detail.newValue) : undefined;
        setState(newValue);
      }
    };

    on(window, 'storage', handleStorageChange);
    on(window, STORAGE_EVENT, handleStorageChange);

    if (!storageLinsters.has(key)) {
      storageLinsters.set(key, new Set());
    }
    storageLinsters.get(key)!.add(handleStorageChange);

    return () => {
      off(window, 'storage', handleStorageChange);
      off(window, STORAGE_EVENT, handleStorageChange);
      storageLinsters.get(key)?.delete(handleStorageChange);
    };
  }, [key, deserializer]);

  return [state, set, remove];
};

export default useLocalStorage;
