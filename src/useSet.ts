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
    const add = (item: K) => setSet((prevSet) => new Set([...Array.from(prevSet), item]));
    const remove = (item: K) =>
      setSet((prevSet) => {
        const nextSet = new Set(prevSet);
        nextSet.delete(item);
        return nextSet;
      });
    const toggle = (item: K) =>
      setSet((prevSet) => {
        const nextSet = new Set(prevSet);
        if (nextSet.has(item)) {
          nextSet.delete(item);
        } else {
          nextSet.add(item);
        }
        return nextSet;
      });

    return { add, remove, toggle, reset: () => setSet(initialSet), clear: () => setSet(new Set()) };
  }, [setSet]);

  const utils = {
    has: useCallback((item) => set.has(item), [set]),
    ...stableActions,
  } as Actions<K>;

  return [set, utils];
};

export default useSet;
