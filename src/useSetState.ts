import { useState } from 'react';

const useSetState = <T extends object>(initialState: T = {} as T): [T, (patch: Partial<T> | (() => void)) => void] => {
  const [state, set] = useState<T>(initialState);
  const setState = patch => {
    set(prevState => Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch));
  };

  return [state, setState];
};

export default useSetState;
