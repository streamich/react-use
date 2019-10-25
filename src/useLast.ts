import { useEffect, useRef } from 'react';

const useLast = <T>(state: T, predicate: (state: T) => boolean): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    if (predicate(state)) {
      ref.current = state;
    }
  });

  return ref.current;
};

export default useLast;
