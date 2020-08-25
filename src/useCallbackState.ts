import { useState, useEffect, useRef, SetStateAction, useCallback } from 'react';

type Callback<T> = (state?: T) => void;
type SetStateWithCallback<T> = (newStateSetter: SetStateAction<T>, callback?: Callback<T>) => void;

function useCallbackState<T>(initialValue: T | (() => T)): [T, SetStateWithCallback<T>] {
  const [state, setState] = useState(initialValue);
  const callbackRef = useRef<Callback<T>>();
  const isFirstCall = useRef(true);

  const setStateWithCallback: SetStateWithCallback<T> = useCallback((newStateSetter, callback) => {
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

  return [state, setStateWithCallback];
}

export default useCallbackState;
