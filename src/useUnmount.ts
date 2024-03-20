import { useRef, useEffect } from 'react';
import useEffectOnce from './useEffectOnce';

const useUnmount = (fn: () => any): void => {
  const fnRef = useRef(fn);

  // update the ref each render so if it change the newest callback will be invoked
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffectOnce(() => () => fnRef.current());
};

export default useUnmount;
