import { useRef, useState } from 'react';

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
  const [, forceUpdate] = useState({});
  const setRef = useRef(new Set(initialSet));

  const actions: Actions<K> = {
    add: (item: K) => {
      setRef.current.add(item);
      forceUpdate({});
    },
    remove: (item: K) => {
      setRef.current.delete(item);
      forceUpdate({});
    },
    toggle: (item: K) => {
      setRef.current.has(item)
        ? setRef.current.delete(item)
        : setRef.current.add(item);
      forceUpdate({});
    },
    reset: () => {
      setRef.current = new Set(initialSet);
      forceUpdate({});
    },
    clear: () => {
      setRef.current.clear();
      forceUpdate({});
    },
    has: (item: K) => setRef.current.has(item),
  };

  return [setRef.current, actions];
};

export default useSet;
