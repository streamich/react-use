import { useCallback, useRef } from 'react';
import useUpdateEffect from './useUpdateEffect';


const useDebounce = (fn: () => any, ms: number = 0, args: any[] = []) => {

  const timer = useRef<number>();

  useUpdateEffect(() => {

    timer.current = window.setTimeout(fn.bind(null, args), ms);
    return () => {
      // if args change then clear timeout
      window.clearTimeout(timer.current);
    };
  }, args);

  const cancel = useCallback(() => {
    if (timer.current) {
      window.clearTimeout(timer.current);
    }
  }, []);

  return { cancel };
};

export default useDebounce;
