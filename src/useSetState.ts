import { useCallback, useState, useRef } from "react";
import useUpdateEffect from "./useUpdateEffect";

type SetCallback<T> = (state: T) => void;

const useSetState = <T extends object>(
  initialState: T = {} as T
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>), callback?: SetCallback<T>) => void] => {
  const [state, set] = useState<T>(initialState);
  let setCallback = useRef<SetCallback<T> | undefined>(undefined);
  const setState = useCallback((patch, callback?: SetCallback<T>) => {
    setCallback.current = callback;
    set((prevState) =>
      Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch)
    );
  }, []);

  useUpdateEffect(() => {
    // run callback only on updates
    if (setCallback.current) {
      setCallback.current(state);
      // reset saved callback
      setCallback.current = undefined;
    }
  }, [state]);

  return [state, setState];
};

export default useSetState;
