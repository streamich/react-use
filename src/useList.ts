import {useState} from 'react';

export interface Actions<T> {
  set: (list: T[]) => void;
  updateAt: (index: number, item: T) => void;
  remove: (index: number) => void;
  push: (item: T) => void;
  filter: (fn: (value: T) => boolean) => void;
  sort: (fn?: (a: T, b: T) => number) => void;
}

const useList = <T>(initialList: T[] = []): [T[], Actions<T>] => {
  const [list, set] = useState<T[]>(initialList);

  return [list, {
    set,
    updateAt: (index, entry) => set([
      ...list.slice(0, index),
      entry,
      ...list.slice(index + 1)
    ]),
    remove: (index) => set([
      ...list.slice(0, index),
      ...list.slice(index + 1)
    ]),
    push: (entry) => set([...list, entry]),
    filter: (fn) => set(list.filter(fn)),
    sort: (fn?) => set([...list].sort(fn)),
  }];
};

export default useList;
