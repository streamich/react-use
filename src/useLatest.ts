import { useRef, useEffect, MutableRefObject } from 'react';

const useLatest = <T>(value: T): MutableRefObject<T> => {
  const latest = useRef<T>(value);

  useEffect(() => {
    latest.current = value;
  }, [value]);

  return latest;
};

export default useLatest;
