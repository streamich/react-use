import { useMemo, useRef } from 'react';
import useMountedState from './useMountedState';
import useUpdate from './useUpdate';
import useUpdateEffect from './useUpdateEffect';

export interface UseStateListReturn<T> {
  state: T;
  currentIndex: number;
  setStateAt: (newIndex: number) => void;
  setState: (state: T) => void;
  next: () => void;
  prev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

// Add defaultCurrentIndex parameter
export default function useStateList<T>(
  stateSet: T[] = [],
  defaultCurrentIndex: number = 0
): UseStateListReturn<T> {
  const isMounted = useMountedState();
  const update = useUpdate();
  // Initialize index with defaultCurrentIndex, clamp to valid range
  const initialIndex =
    stateSet.length === 0
      ? 0
      : Math.max(0, Math.min(defaultCurrentIndex, stateSet.length - 1));
  const index = useRef(initialIndex);

  // If new state list is shorter than before - switch to the last element
  useUpdateEffect(() => {
    if (stateSet.length <= index.current) {
      index.current = stateSet.length - 1;
      update();
    }
  }, [stateSet.length]);

  const actions = useMemo(
    () => ({
      next: () => actions.setStateAt(index.current + 1),
      prev: () => actions.setStateAt(index.current - 1),
      setStateAt: (newIndex: number) => {
        if (!isMounted()) return;
        if (!stateSet.length) return;
        if (newIndex === index.current) return;
        index.current =
          newIndex >= 0
            ? newIndex % stateSet.length
            : stateSet.length + (newIndex % stateSet.length);
        update();
      },
      setState: (state: T) => {
        if (!isMounted()) return;
        const newIndex = stateSet.length ? stateSet.indexOf(state) : -1;
        if (newIndex === -1) {
          throw new Error(
            `State '${state}' is not a valid state (does not exist in state list)`
          );
        }
        index.current = newIndex;
        update();
      },
    }),
    [stateSet]
  );

  return {
    state: stateSet[index.current],
    currentIndex: index.current,
    isFirst: index.current === 0,
    isLast: index.current === stateSet.length - 1,
    ...actions,
  };
}