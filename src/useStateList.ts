import { useState, useCallback } from 'react';

import useUpdateEffect from './useUpdateEffect';

export default function useStateList<T>(
  stateSet: T[] = []
): { state: T; next: () => void; prev: () => void; currentIndex: number } {
  const [currentIndex, setCurrentIndex] = useState(0);

  // In case we receive a different state set, check if the current index still exists and
  // reset it to the last if it don't.
  useUpdateEffect(() => {
    if (!stateSet[currentIndex]) {
      setCurrentIndex(stateSet.length - 1);
    }
  }, [stateSet]);

  const next = useCallback(() => {
    const nextStateIndex = stateSet.length === currentIndex + 1 ? 0 : currentIndex + 1;

    setCurrentIndex(nextStateIndex);
  }, [stateSet, currentIndex]);

  const prev = useCallback(() => {
    const prevStateIndex = currentIndex === 0 ? stateSet.length - 1 : currentIndex - 1;

    setCurrentIndex(prevStateIndex);
  }, [stateSet, currentIndex]);

  return {
    state: stateSet[currentIndex],
    next,
    prev,
    currentIndex,
  };
}
