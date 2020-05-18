import useValue from './useValue';
import { useCallback } from 'react';

export const useFunction = <T extends Function>(fn: T): T => {
  const fnRef = useValue(fn);

  return useCallback<any>(function (this) {
    return fnRef.current.apply(this, arguments);
  }, []);
};

export default useFunction;
