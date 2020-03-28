import { useReducer, Reducer } from 'react';

const useToggle = (initialValue: boolean): [boolean, (nextValue?: any) => void] => {
  return useReducer<Reducer<boolean, any>>(
    (state: boolean, nextValue?: any) => (typeof nextValue === 'boolean' ? nextValue : !state),
    initialValue
  );
};

export default useToggle;
