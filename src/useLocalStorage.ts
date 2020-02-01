import { useEffect, useState, useRef } from 'react';
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

const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  if (!isClient) {
    return [initialValue as T, () => {}];
  }

  const isMountedRef = useRef(true);

  // Use provided serializer/deserializer or the default ones
  const serializer = options ? (options.raw ? String : options.serializer) : JSON.stringify;
  const deserializer = options ? (options.raw ? String : options.deserializer) : JSON.parse;

  const [state, setState] = useState<T>(() => {
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

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  });

  const setItem = (newState: T) => {
    try {
      localStorage.setItem(key, serializer(newState));
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. Also JSON.stringify can throw.
    }
  };

  useEffect(() => {
    setItem(state);
  }, [state]);

  const setLocalStorageValue: React.Dispatch<React.SetStateAction<T>> = newState => {
    const isMounted = isMountedRef.current;
    // if component unmounted set local storage directly
    if (!isMounted) {
      setItem(newState as any);
      return;
    }
    setState(newState);
  };

  return [state, setLocalStorageValue];
};

export default useLocalStorage;
