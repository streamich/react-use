import { useReducer } from 'react';

const toggleReducer = (state: boolean, nextValue?: unknown) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

const useToggle = (initialValue: boolean): [boolean, (nextValue?: unknown) => void] => {
  return useReducer(toggleReducer, initialValue) as [boolean, (nextValue?: unknown) => void];
};

export default useToggle;
