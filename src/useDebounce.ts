import { DependencyList } from 'react';
import useUpdateEffect from './useUpdateEffect';

const useDebounce = (fn: () => any, ms: number = 0, deps: DependencyList = []) => {
  useUpdateEffect(() => {
    const timeout = setTimeout(fn, ms);

    return () => {
      clearTimeout(timeout);
    };
  }, deps);
};

export default useDebounce;
