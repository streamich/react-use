import { useState, useEffect, useRef, SetStateAction, useCallback } from 'react';

type Callback<T> = (state?: T) => void;
type StateSetterWithCallback<T> = (newStateSetter: SetStateAction<T>, callback?: Callback<T>) => void;

function useStateWithCallback<T>(initialValue: T | (() => T)): [T, StateSetterWithCallback<T>] {
  const [state, setState] = useState(initialValue);
  const callbackRef = useRef<Callback<T>>();
  const isFirstCall = useRef(true);

  const stateSetterWithCallback: StateSetterWithCallback<T> = useCallback((newStateSetter, callback) => {
    callbackRef.current = callback;
    setState(newStateSetter);
  },[]);

  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      return;
    }
    callbackRef.current?.(state);
  }, [state]);

  return [state, stateSetterWithCallback];
}

export default useStateWithCallback;
