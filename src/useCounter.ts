import useGetSet from './useGetSet';
import {useCallback} from './react';

export interface CounterActions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  get: () => number;
  set: (value: number) => void;
  reset: (value?: number) => void;
}

const useCounter = (initialValue: number = 0): [number, CounterActions] => {
  const [get, set] = useGetSet<number>(initialValue);
  const inc = useCallback((delta: number = 1) => set(get() + delta), []);
  const dec = useCallback((delta: number = 1) => inc(-delta), []);
  const reset = useCallback((value: number = initialValue) => {
    initialValue = value;
    set(value);
  }, []);
  const actions = {
    inc,
    dec,
    get,
    set,
    reset,
  };

  return [get(), actions];
};

export default useCounter;
