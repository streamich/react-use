import { useRef, MutableRefObject } from 'react';

const useLatest = <T>(value: T): MutableRefObject<T> => {
  const latest = useRef<T>(value);

  latest.current = value;

  return latest;
};

export default useLatest;
