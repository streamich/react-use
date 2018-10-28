import {useState} from './react';

const useSetState = <T extends object>(initialState: T = {} as T): [T, (patch: Partial<T>) => void]=> {
  const [state, set] = useState<T>(initialState);
  const setState = (patch) => {
    Object.assign(state, patch);
    set(state);
  };

  return [state, setState];
};

export default useSetState;
