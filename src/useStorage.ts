/* eslint-disable */
import { useCallback, Dispatch, useMemo } from 'react';
import { InitialHookState, HookState, resolveHookState,  } from './util/resolveHookState';
import { isClient } from './util';
import { createGlobalState, GlobalStateHookReturn } from './createGlobalState';

type DispatchAction<T> = Dispatch<HookState<T | undefined>>;
type localStateHook<T> = (initialState?: InitialHookState<T>) => GlobalStateHookReturn<T>;
type storageKeyHooks = {
  [storageType: string]: {
    [key: string]: localStateHook<any>
  }
};
let useStorageKeyHook: storageKeyHooks = {}
// This is useful for testing
export const resetStorageState = () => {
  useStorageKeyHook = {}
}

export type parserOptions<T> =
  | {
      raw: true;
    }
  | {
      raw: false;
      serializer: (value: T) => string;
      deserializer: (value: string) => T;
    };

const noop = () => {};

const useStorage = <T>(
  storageType: string,
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, DispatchAction<T>, () => void] => {
  if (!isClient) {
    return [initialValue as T, noop, noop];
  }
  if (!key) {
    throw new Error('Storage key may not be falsy');
  }
  //default to localStorage

  let storage = useMemo(() => {
    if (storageType == 'sessionStorage') return sessionStorage;
    //defaults to localStorage what ever the key was used
    else return localStorage;
  }, [storageType]);

  const deserializer = options ? (options.raw ? value => value : options.deserializer) : JSON.parse;

  const setInitialState = () => {
    try {
      const serializer = options ? (options.raw ? String : options.serializer) : JSON.stringify;

      const storageValue = storage.getItem(key);
      if (storageValue !== null) {
        return deserializer(storageValue);
      } else {
        initialValue && storage.setItem(key, serializer(initialValue));
        return initialValue;
      }
    } catch (error) {
      // If user is in private mode or has storage restriction
      // storage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      console.error(error)
      return initialValue;
    }
  };

  if (!useStorageKeyHook[storageType]) {
    useStorageKeyHook[storageType] = {}
  }
  if (!useStorageKeyHook[storageType][key]) {
    useStorageKeyHook[storageType][key] = createGlobalState<T | undefined>(undefined)
  }
  const useStorageState: localStateHook<T | undefined> = useStorageKeyHook[storageType][key]
  const [ state, setState ] = useStorageState(setInitialState)

  const removeKey = () => {
    try {
      storage.removeItem(key);
      setState(undefined);
    } catch(error) {
      // If user is in private mode or has storage restriction
      // storage can throw.
      console.error(error);
    }
  }

  const set: DispatchAction<T> = useCallback(
    valOrFunc => {
      try {
        const newState = resolveHookState(valOrFunc, state)
        // if (typeof newState === 'undefined') return;
        if (typeof newState === 'undefined') return removeKey()
        let value: string;

        if (options)
          if (options.raw)
            if (typeof newState === 'string') value = newState;
            else value = JSON.stringify(newState);
          else if (options.serializer) value = options.serializer(newState);
          else value = JSON.stringify(newState);
        else value = JSON.stringify(newState);

        storage.setItem(key, value);
        setState(deserializer(value));
      } catch (error) {
        // If user is in private mode or has storage restriction
        // storage can throw. Also JSON.stringify can throw.
        console.error(error);
      }
    },
    [key, setState]
  );

  const remove = useCallback(removeKey, [key, setState]);

  return [state, set, remove];
};

export default useStorage;
