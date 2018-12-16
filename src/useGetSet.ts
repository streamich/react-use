import {useRef, useCallback} from 'react';
import useUpdate from './useUpdate';

const useGetSet = <T>(initialValue: T): [() => T, (value: T) => void] => {
  let state = useRef(initialValue);
  const update = useUpdate();
  const get = useCallback(() => state.current, []);
  const set = useCallback((value: T) => {
    state.current = value;
    update();
  }, []);

  return [get, set];
};

export default useGetSet;
