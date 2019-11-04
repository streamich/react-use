import { useCallback, useRef } from 'react';
import useMountedState from './useMountedState';
import useUpdate from './useUpdate';
import useUpdateEffect from './useUpdateEffect';

export default function useStateList<T>(stateSet: T[] = []): { state: T; next: () => void; prev: () => void } {
  const isMounted = useMountedState();
  const update = useUpdate();
  const index = useRef(0);

  // If new state list is shorter that before - switch to the last element
  useUpdateEffect(() => {
    if (stateSet.length <= index.current) {
      index.current = stateSet.length - 1;
      update();
    }
  }, [stateSet.length]);

  return {
    state: stateSet[index.current],
    next: useCallback(() => {
      // do nothing on unmounted component
      if (!isMounted()) {
        return;
      }

      // act only if stateSet has element within
      if (stateSet.length) {
        index.current = (index.current + 1) % stateSet.length;
        update();
      }
    }, [stateSet, index]),
    prev: useCallback(() => {
      // do nothing on unmounted component
      if (!isMounted()) {
        return;
      }

      // act only if stateSet has element within
      if (stateSet.length) {
        index.current = index.current - 1 < 0 ? stateSet.length - 1 : index.current - 1;
        update();
      }
    }, [stateSet, index]),
  };
}
