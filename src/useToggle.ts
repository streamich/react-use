import { useReducer, ActionDispatch } from 'react';

const toggleReducer = (state: any, nextValue?: any) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

const useToggle = (initialValue: boolean): [boolean, ActionDispatch<any>] => {
  return useReducer(toggleReducer, initialValue);
};

export default useToggle;
