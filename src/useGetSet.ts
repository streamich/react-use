import {useRef} from './react';
import useUpdate from './useUpdate';

const useGetSet = <T>(initialValue: T): [() => T, (value: T) => void] => {
  const update = useUpdate();
  let state = useRef(initialValue);

  const get = () => state.current;
  const set = (value: T) => {
    state.current = value;
    update();
  };

  return [get, set];
};

export default useGetSet;
