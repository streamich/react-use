import { useCallback, useMemo, useState } from 'react';

export interface StableActions<K> {
  add: (key: K) => void;
  remove: (key: K) => void;
  toggle: (key: K) => void;
  reset: () => void;
}

export interface Actions<K> extends StableActions<K> {
  has: (key: K) => boolean;
}

const useSet = <K>(initialSet = new Set<K>()): [Set<K>, Actions<K>] => {
  const [set, setSet] = useState(initialSet);

  const stableActions = useMemo<StableActions<K>>(() => {
    const add = (item: K) => setSet((prevSet) => new Set([...Array.from(prevSet), item]));
    const remove = (item: K) =>
      setSet((prevSet) => new Set(Array.from(prevSet).filter((i) => i !== item)));
    const toggle = (item: K) =>
      setSet((prevSet) =>
        prevSet.has(item)
          ? new Set(Array.from(prevSet).filter((i) => i !== item))
          : new Set([...Array.from(prevSet), item])
      );

    return { add, remove, toggle, reset: () => setSet(initialSet) };
  }, [setSet]);

  const utils = {
    has: useCallback((item) => set.has(item), [set]),
    ...stableActions,
  } as Actions<K>;

  return [set, utils];
};

export default useSet;
