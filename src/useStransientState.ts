/* eslint-disable */
import { useState, useEffect } from "react";
import useTimeoutFn from "./useTimeoutFn";

export default <T>(baseState: T, ms: number = 1000): [T, (transientValue: T) => void] => {
  const [value, setValue] = useState<T>(baseState);
  const [, cancel, restart] = useTimeoutFn(() => setValue(baseState), ms);

  useEffect(() => {
    cancel();
    setValue(baseState);
  }, [baseState, ms]);

  const setTransientValue = (transientValue: T): void => {
    setValue(transientValue);
    restart();
  };

  return [value, setTransientValue];
};
