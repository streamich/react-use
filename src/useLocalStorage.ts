import { useEffect, useState } from 'react';
import { isClient } from './util';

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

const useLocalStorage = <T>(key: string, initialValue?: T, raw?: boolean): [T, Dispatch<SetStateAction<T>>] => {
  if (!isClient) {
    return [initialValue as T, () => {}];
  }

  const [state, setState] = useState<T>(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (typeof localStorageValue !== 'string') {
        localStorage.setItem(key, raw ? String(initialValue) : JSON.stringify(initialValue));
        return initialValue;
      } else {
        return raw ? localStorageValue : JSON.parse(localStorageValue || 'null');
      }
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedState = raw ? String(state) : JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. Also JSON.stringify can throw.
    }
  }, [state]);

  return [state, setState];
};

export default useLocalStorage;
