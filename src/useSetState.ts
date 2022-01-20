import { useCallback, useState } from 'react';

import { IHookStateInitAction, IHookStateSetAction, resolveHookState } from './misc/hookState';

const useSetState = <T>(initialState: IHookStateInitAction<T> | {} = {}) => {
  const [state, set] = useState(initialState);

  const setState = useCallback((patch: IHookStateSetAction<T | {}>) => {
    set((prevState) => ({ ...prevState, ...resolveHookState(patch, prevState) }));
  }, []);

  return [state, setState] as const;
};

export default useSetState;
