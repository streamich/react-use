import { useState, useMemo } from 'react';

export interface Actions<K> {
  has: (key: K) => boolean;
  add: (key: K) => void;
  remove: (key: K) => void;
  reset: () => void;
}

const useSet = <K>(initialSet = new Set<K>()): [Set<K>, Actions<K>] => {
  const [set, setSet] = useState(initialSet);

  const utils = useMemo<Actions<K>>(
    () => ({
      has: item => set.has(item),
      add: item => setSet(prevSet => new Set([...Array.from(prevSet), item])),
      remove: item => setSet(prevSet => new Set(Array.from(prevSet).filter(i => i !== item))),
      reset: () => setSet(initialSet),
    }),
    [setSet]
  );

  return [set, utils];
};

export default useSet;
