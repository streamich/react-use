import {useState} from './react';

export interface Actions<T> {
  set: (list: T[]) => void;
  push: (item: T) => void;
  filter: (fn: (value: T) => boolean) => void;
  sort: (fn?: (a: T, b: T) => number) => void;
}

const useList = <T>(initialList: T[] = []): [T[], Actions<T>] => {
  const [list, set] = useState<T[]>(initialList);

  return [list, {
    set,
    push: (entry) => set([...list, entry]),
    filter: (fn) => set(list.filter(fn)),
    sort: (fn?) => set([...list].sort(fn)),
  }];
};

export default useList;
