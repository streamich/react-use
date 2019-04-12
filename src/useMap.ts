import { useState } from 'react';

export interface Actions<K, V> {
  get: (key: K) => any;
  set: (key: K, value: V) => void;
  remove: (key: K) => void;
  reset: () => void;
}

const useMap = <T extends { [key: string]: any }>(initialMap: any = {}): [T, Actions<string, any>] => {
  const [map, set] = useState<T>(initialMap as any);

  return [
    map,
    {
      get: (key: string) => map[key],
      set: (key: string, entry: any) =>
        set({
          ...(map as any),
          [key]: entry,
        }),
      remove: (key: string) => {
        const { [key]: omit, ...rest } = map as any;
        set(rest);
      },
      reset: () => set(initialMap),
    },
  ];
};

export default useMap;
