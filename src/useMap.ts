import { useCallback, useMemo, useReducer, useRef } from 'react';

export interface StableActions<T extends object> {
  set: <K extends keyof T>(key: K, value: T[K]) => void;
  setAll: (newMap: T) => void;
  remove: <K extends keyof T>(key: K) => void;
  reset: () => void;
  clear: () => void;
}

export interface Actions<T extends object> extends StableActions<T> {
  get: <K extends keyof T>(key: K) => T[K];
  has: <K extends keyof T>(key: K) => boolean;
}

const useMap = <T extends Record<string, any> = Record<string, any>>(
  initialMap: T = {} as T
): [T, Actions<T>] => {
  // Keep the canonical object in a ref; re-render via counter
  const initialRef = useRef<T>(structuredClone ? structuredClone(initialMap) : { ...(initialMap as any) });
  const ref = useRef<T>({ ...(initialMap as any) });
  const [, force] = useReducer((c: number) => c + 1, 0);

  const setKey = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    (ref.current as any)[key] = value;
    force();
  }, []);

  const setAll = useCallback((newMap: T) => {
    ref.current = { ...(newMap as any) };
    force();
  }, []);

  const remove = useCallback(<K extends keyof T>(key: K) => {
    if (key in ref.current) {
      delete (ref.current as any)[key];
      force();
    }
  }, []);

  const reset = useCallback(() => {
    ref.current = { ...(initialRef.current as any) };
    force();
  }, []);

  const clear = useCallback(() => {
    ref.current = {} as T;
    force();
  }, []);

  const get = useCallback(<K extends keyof T>(key: K): T[K] => ref.current[key], []);
  const has = useCallback(<K extends keyof T>(key: K) => key in ref.current, []);

  const stableActions = useMemo<Actions<T>>(
    () => ({
      set: setKey,
      setAll,
      remove,
      reset,
      clear,
      get,
      has,
    }),
    [setKey, setAll, remove, reset, clear, get, has]
  );

  return [ref.current, stableActions];
};

export default useMap;
