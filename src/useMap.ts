import { useMemo, useState } from 'react';

const createMap = <TValue>(value: TValue): Map<keyof TValue, any> =>
  Object.keys(value).reduce((acc, key) => {
    acc.set(key, value[key]);

    return acc;
  }, new Map());

const useMap = <TValue extends object = any>(initialValue: TValue) => {
  const [map, set] = useState<Map<keyof TValue, any>>(() => createMap(initialValue));

  const constantHandlers = useMemo(
    () => ({
      set(key: keyof TValue, value: any) {
        set(map.set(key, value));
      },
      remove(key: keyof TValue) {
        if (map.delete(key)) {
          set(map);
        }
      },
      reset() {
        set(createMap(initialValue));
      },
      replace(key1: keyof TValue, key2: keyof TValue) {
        const value1 = map.get(key1);
        const value2 = map.get(key2);

        if (value1 && value2) {
          map.set(key1, value2);
          map.set(key2, value1);

          set(map);
        }
      },
    }),
    [set, map, initialValue]
  );

  const customHandlers = useMemo(
    () => ({
      setAll(newValue: TValue) {
        set(createMap(newValue));
      },
    }),
    []
  );

  const handlers = useMemo(
    () => ({
      ...constantHandlers,
      ...customHandlers,
    }),
    [constantHandlers, customHandlers]
  );

  return [map, handlers] as const;
};

export default useMap;
