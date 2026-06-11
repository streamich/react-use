import { useCallback, useMemo, useState } from 'react';

export interface StableActions<T extends object> {
  set: <K extends keyof T>(key: K, value: T[K]) => void;
  setAll: (newMap: T) => void;
  remove: <K extends keyof T>(key: K) => void;
  reset: () => void;
}

export interface Actions<T extends object> extends StableActions<T> {
  get: <K extends keyof T>(key: K) => T[K];
}

const useMap = <T extends object = any>(initialMap: T = {} as T): [T, Actions<T>] => {
  const [map, setMap] = useState<T>(() => ({ ...initialMap }));

  const stableActions = useMemo<StableActions<T>>(
    () => ({
      set: <K extends keyof T>(key: K, value: T[K]) =>
        setMap((prev) => {
          // Use Object.is for correct NaN handling
          if (Object.is(prev[key], value)) return prev;
          return {
            ...prev,
            [key]: value,
          };
        }),
      setAll: (newMap: T) => setMap(newMap),
      remove: <K extends keyof T>(key: K) =>
        setMap((prev) => {
          if (!(key in prev)) return prev;
          const { [key]: omit, ...rest } = prev;
          return rest as T;
        }),
      reset: () => setMap({ ...initialMap }),
    }),
    [initialMap]
  );

  const get = useCallback(<K extends keyof T>(key: K): T[K] => map[key], [map]);

  // Memoize the entire utils object to maintain stable reference
  const utils = useMemo<Actions<T>>(() => ({ get, ...stableActions }), [get, stableActions]);

  return [map, utils];
};

export default useMap;
