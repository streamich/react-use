import { useCallback, useRef } from 'react';
import useUpdate from './useUpdate';

const useGetSet = <T>(initialValue: T): [() => T, (value: T) => void] => {
  const state = useRef(initialValue);
  const update = useUpdate();
  const get = useCallback(() => state.current, []);
  const set = useCallback((value: T) => {
    state.current = value;
    update();
  }, []);

  return [get, set];
};

export default useGetSet;
