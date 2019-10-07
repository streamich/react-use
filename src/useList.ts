import { useState, useMemo } from 'react';

export interface Actions<T> {
  set: (list: T[]) => void;
  clear: () => void;
  updateAt: (index: number, item: T) => void;
  remove: (index: number) => void;
  push: (item: T) => void;
  filter: (fn: (value: T) => boolean) => void;
  sort: (fn?: (a: T, b: T) => number) => void;
  reset: () => void;
}

const useList = <T>(initialList: T[] = []): [T[], Actions<T>] => {
  const [list, set] = useState<T[]>(initialList);

  const utils = useMemo<Actions<T>>(
    () => ({
      set,
      clear: () => set([]),
      updateAt: (index, entry) =>
        set(currentList => [...currentList.slice(0, index), entry, ...currentList.slice(index + 1)]),
      remove: index => set(currentList => [...currentList.slice(0, index), ...currentList.slice(index + 1)]),
      push: entry => set(currentList => [...currentList, entry]),
      filter: fn => set(currentList => currentList.filter(fn)),
      sort: (fn?) => set(currentList => [...currentList].sort(fn)),
      reset: () => set([...initialList]),
    }),
    [set]
  );

  return [list, utils];
};

export default useList;
