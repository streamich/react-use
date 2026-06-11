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
  const [set, setSet] = useState(() => new Set(initialSet));

  const stableActions = useMemo<StableActions<K>>(
    () => ({
      add: (item: K) =>
        setSet((prev) => {
          if (prev.has(item)) return prev;
          const next = new Set(prev);
          next.add(item);
          return next;
        }),
      remove: (item: K) =>
        setSet((prev) => {
          if (!prev.has(item)) return prev;
          const next = new Set(prev);
          next.delete(item);
          return next;
        }),
      toggle: (item: K) =>
        setSet((prev) => {
          const next = new Set(prev);
          prev.has(item) ? next.delete(item) : next.add(item);
          return next;
        }),
      reset: () => setSet(new Set(initialSet)),
      clear: () => setSet((prev) => (prev.size === 0 ? prev : new Set())),
    }),
    [initialSet]
  );

  const has = useCallback((item: K) => set.has(item), [set]);

  // Memoize the entire utils object to maintain stable reference
  const utils = useMemo<Actions<K>>(() => ({ has, ...stableActions }), [has, stableActions]);

  return [set, utils];
};

export default useSet;
