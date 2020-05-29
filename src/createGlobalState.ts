/* eslint-disable */
import { useLayoutEffect, useState } from 'react';

export function createGlobalState<S = any>(initialState?: S) {
  let state = initialState;
  let setters: any[] = [];

  function setState(newState: S) {
    state = newState;
    setters.forEach(setter => setter(state));
  }

  return (): [S | undefined, (state: S) => void] => {
    const [globalState, stateSetter] = useState<S | undefined>(state);

    useLayoutEffect(() => {
      setters.push(stateSetter);
      return () => {
        setters = setters.filter(setter => setter !== stateSetter);
      }
    }, []);

    return [globalState, setState];
  };
}

export default createGlobalState;
