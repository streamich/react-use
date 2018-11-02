import {useState} from './react';

const useSetState = <T extends object>(initialState: T = {} as T): [T, (patch: Partial<T> | Function) => void]=> {
  const [state, set] = useState<T>(initialState);
  const setState = (patch) => {
    if (patch instanceof Function) {
      set((prevState) => {
          return Object.assign(state, patch(prevState))
      })
    } else {
      Object.assign(state, patch);
      set(state);
    }
  };

  return [state, setState];
};

export default useSetState;
