import { useCallback, useMemo, useReducer, useRef } from 'react';

export interface StableActions<K> {
  add: (key: K) => void;
  remove: (key: K) => void;
  toggle: (key: K) => void;
  reset: () => void;
  clear: () => void;
}

export interface Actions<K> extends StableActions<K> {
  has: (key: K) => boolean;
  size: () => number;
  toArray: () => K[];
}

const useSet = <K>(initial: Iterable<K> = []): [Set<K>, Actions<K>] => {
  const initialSet = useMemo(() => new Set<K>(initial), []); // stable snapshot
  const ref = useRef<Set<K>>(new Set(initialSet));
  const [, force] = useReducer((c: number) => c + 1, 0);

  const add = useCallback((item: K) => {
    if (!ref.current.has(item)) {
      ref.current.add(item);
      force();
    }
  }, []);

  const remove = useCallback((item: K) => {
    if (ref.current.delete(item)) force();
  }, []);

  const toggle = useCallback((item: K) => {
    if (ref.current.has(item)) ref.current.delete(item);
    else ref.current.add(item);
    force();
  }, []);

  const reset = useCallback(() => {
    ref.current = new Set(initialSet);
    force();
  }, [initialSet]);

  const clear = useCallback(() => {
    if (ref.current.size) {
      ref.current.clear();
      force();
    }
  }, []);

  const has = useCallback((item: K) => ref.current.has(item), []);
  const size = useCallback(() => ref.current.size, []);
  const toArray = useCallback(() => Array.from(ref.current), []);

  const utils = useMemo<Actions<K>>(
    () => ({ add, remove, toggle, reset, clear, has, size, toArray }),
    [add, remove, toggle, reset, clear, has, size, toArray]
  );

  return [ref.current, utils];
};

export default useSet;
