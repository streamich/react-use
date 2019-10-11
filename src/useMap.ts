import { useState, useMemo } from 'react';

export interface Actions<T extends object> {
  get: <K extends keyof T>(key: K) => T[K];
  set: <K extends keyof T>(key: K, value: T[K]) => void;
  remove: <K extends keyof T>(key: K) => void;
  reset: () => void;
}

const useMap = <T extends object = any>(initialMap: T = {} as T): [T, Actions<T>] => {
  const [map, set] = useState<T>(initialMap);

  const utils = useMemo<Actions<T>>(
    () => ({
      get: key => map[key],
      set: (key, entry) => {
        set(prevMap => ({
          ...prevMap,
          [key]: entry,
        }));
      },
      remove: key => {
        set(prevMap => {
          const { [key]: omit, ...rest } = prevMap;
          return rest as T;
        });
      },
      reset: () => set(initialMap),
    }),
    [set]
  );

  return [map, utils];
};

export default useMap;
