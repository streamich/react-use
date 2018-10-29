import {useState, useRef} from './react';

const useGetSet = <T>(initialValue: T): [() => T, (value: T) => void] => {
  const [_, update] = useState(undefined);
  let state = useRef(initialValue);

  const get = () => state.current;
  const set = (value: T) => {
    state.current = value;
    update(undefined);
  };

  return [get, set];
};

export default useGetSet;
