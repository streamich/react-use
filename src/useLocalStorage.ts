import { useEffect, useState, useCallback } from 'react';
import { isClient } from './util';

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

const noop = () => {};
const isUndefined = (value?: any): boolean => typeof value === 'undefined';

const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  raw?: boolean
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  if (!isClient) {
    return [initialValue as T, noop, noop];
  }

  const [state, setState] = useState<T | undefined>(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (isUndefined(initialValue)) {
        return undefined;
      }
      if (typeof localStorageValue !== 'string') {
        localStorage.setItem(key, raw ? String(initialValue) : JSON.stringify(initialValue));
        return initialValue;
      }
      return raw ? localStorageValue : JSON.parse(localStorageValue || 'null');
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
      const serializedState = raw ? String(state) : JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. Also JSON.stringify can throw.
    }
  }, [state]);
  return [state, setState, remove];
};

export default useLocalStorage;
