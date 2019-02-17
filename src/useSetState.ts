import {useState} from 'react';

const useSetState = <T extends object>(initialState: T = {} as T): [T, (patch: Partial<T> | Function) => void]=> {
  const [state, set] = useState<T>(initialState);
  const setState = patch => {
    if (patch instanceof Function) set(prevState => Object.assign({}, prevState, patch(prevState)));
    else set(Object.assign({}, state, patch));
  };

  return [state, setState];
};

export default useSetState;
