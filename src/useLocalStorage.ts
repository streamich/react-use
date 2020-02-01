import { useEffect, useState, useRef, useCallback } from 'react';
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

  const getLocalStorage = () => {
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
      // localStorage can throw. Also JSON.stringify can throw.
    }
  };
  const setLocalStorage = (newState: T) => {
    try {
      localStorage.setItem(key, serializer(newState));
    } catch {}
  };

  // Use provided serializer/deserializer or the default ones
  const serializer = options ? (options.raw ? String : options.serializer) : JSON.stringify;
  const deserializer = options ? (options.raw ? String : options.deserializer) : JSON.parse;

  const [state, setState] = useState<T>(() => getLocalStorage());

  useEffect(() => {
    setLocalStorage(state);
  }, [state]);

  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  });

  // if component unmounted set local storage directly
  const setStateWhenUnmounted: React.Dispatch<React.SetStateAction<T>> = newState => {
    if (typeof newState === 'function') {
      type FunctionSetState = (oldState: T) => T;
      const currentState = getLocalStorage();
      const resolvedValue = (newState as FunctionSetState)(currentState);
      setLocalStorage(resolvedValue);
    } else {
      setLocalStorage(newState as T);
    }
  };

  const wrappedSetState: React.Dispatch<React.SetStateAction<T>> = useCallback(
    newState => {
      const isMounted = isMountedRef.current;
      if (!isMounted) {
        setStateWhenUnmounted(newState);
      } else {
        setState(newState);
      }
    },
    [isMountedRef]
  );

  return [state, wrappedSetState];
};

export default useLocalStorage;
