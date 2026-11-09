import { useCallback, useMemo, useState } from 'react';

export interface StableActions<K> {
  add: (key: K) => void;
  remove: (key: K) => void;
  toggle: (key: K) => void;
  reset: () => void;
  clear: () => void;
}

export interface Actions<K> extends StableActions<K> {
  has: (key: K) => boolean;
}

const useSet = <K>(initialSet = new Set<K>()): [Set<K>, Actions<K>] => {
  const [set, setSet] = useState(initialSet);

  const stableActions = useMemo<StableActions<K>>(() => {
    const add = (item: K) =>
      setSet((prevSet) => {
        if (prevSet.has(item)) return prevSet;

        const newSet = new Set(prevSet);
        newSet.add(item);
        return newSet;
      });

    const remove = (item: K) =>
      setSet((prevSet) => {
        if (!prevSet.has(item)) return prevSet;

        const newSet = new Set(prevSet);
        newSet.delete(item);
        return newSet;
      });

    const toggle = (item: K) =>
      setSet((prevSet) => {
        const newSet = new Set(prevSet);
        if (newSet.has(item)) {
          newSet.delete(item);
        } else {
          newSet.add(item);
        }
        return newSet;
      });

    const reset = () => setSet(initialSet);

    const clear = () =>
      setSet((prevSet) => {
        if (prevSet.size === 0) return prevSet;
        return new Set();
      });

    return { add, remove, toggle, reset, clear };
  }, [setSet]);

  const utils = {
    has: useCallback((item) => set.has(item), [set]),
    ...stableActions,
  } as Actions<K>;

  return [set, utils];
};

export default useSet;
