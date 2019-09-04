import { useState } from 'react';

export interface Actions<T> {
  set: (list: T[]) => void;
  clear: () => void;
  updateAt: (index: number, item: T) => void;
  updateItem: (predicate: (item: T, index: number) => boolean, updater: (item: T) => T) => void;
  remove: (index: number) => void;
  removeItem: (predicate: (item: T) => boolean) => void;
  push: (item: T) => void;
  filter: (fn: (value: T) => boolean) => void;
  sort: (fn?: (a: T, b: T) => number) => void;
}

const useList = <T>(initialList: T[] = []): [T[], Actions<T>] => {
  const [list, set] = useState<T[]>(initialList);

  const actions: Actions<T> = {
    set,
    clear: () => set([]),
    updateAt: (index, entry) =>
      set(currentList => [...currentList.slice(0, index), entry, ...currentList.slice(index + 1)]),
    updateItem: (predicate, updater) => {
      const item = list.find(predicate);
      item && actions.updateAt(list.findIndex(predicate), updater(item));
    },
    remove: index => set(currentList => [...currentList.slice(0, index), ...currentList.slice(index + 1)]),
    removeItem: predicate => actions.remove(list.findIndex(predicate)),
    push: entry => set(currentList => [...currentList, entry]),
    filter: fn => set(currentList => currentList.filter(fn)),
    sort: (fn?) => set(currentList => [...currentList].sort(fn)),
  };
  return [list, actions];
};

export default useList;
