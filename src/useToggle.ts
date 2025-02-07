import { useReducer } from 'react';

const toggleReducer = (state: boolean, nextValue?: unknown) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

const useToggle = (initialValue: boolean): [boolean, (nextValue?: unknown) => void] => {
  return useReducer<boolean, [unknown]>(toggleReducer, initialValue);
};

export default useToggle;
