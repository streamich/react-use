import { useCallback, useEffect, useRef, useState } from 'react';
import { useFirstMountState } from './useFirstMountState';

export type Patch<T> = Partial<T> | ((prevState: T) => Partial<T>);
export type Callback<T> = (currentState?: T) => void;

export type SetStateActionWithCallback<T> = (patch: Patch<T>, callback?: Callback<T>) => void;

const useSetState = <T extends object>(initialState: T = {} as T): [T, SetStateActionWithCallback<T>] => {
  const [state, set] = useState<T>(initialState);
  const callBackRef = useRef<Callback<T>>();
  const isFirstMount = useFirstMountState();

  // This effect will call after every state change, in order to implement second "callback" parameter
  // which calls after render finishes
  useEffect(() => {
    // Skip the first render
    if (isFirstMount) return;

    // Call callback parameter
    callBackRef.current?.(state);
  }, [state]);

  const setState = useCallback(
    (patch: Patch<T>, callback?: Callback<T>) => {
      // Save callback reference here, and call later, after state render finishes.
      callBackRef.current = callback;

      set((prevState) => Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch));
    },
    [set]
  );

  return [state, setState];
};

export default useSetState;
