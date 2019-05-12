import { useState } from 'react';

export interface Actions<T extends object> {
  get: <K extends keyof T>(key: K) => T[K];
  set: <K extends keyof T>(key: K, value: T[K]) => void;
  remove: <K extends keyof T>(key: K) => void;
  reset: () => void;
}

const useMap = <T extends object = any>(initialMap: T = {} as T): [T, Actions<T>] => {
  const [map, set] = useState<T>(initialMap);

  return [
    map,
    {
      get: (key: keyof T) => map[key as string],
      set: <K extends keyof T>(key: K, entry: T[K]) => {
        set({
          ...map,
          [key]: entry,
        });
      },
      remove: (key: keyof T) => {
        const { [key]: omit, ...rest } = map;
        set(rest as T);
      },
      reset: () => set(initialMap),
    },
  ];
};

export default useMap;
