import {useState} from './react';

export type Increment = (inc?: number) => void;
export type Set = (value: number) => void;

const useCounter = (initialValue: number = 0): [number, Increment, Set] => {
  const [value, set] = useState<number>(initialValue);

  return [value, (inc = 1) => set(value + inc), set];
};

export default useCounter;
