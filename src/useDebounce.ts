import { useEffect } from 'react';

const useDebounce = (fn: () => any, ms: number = 0, args: Array<any> = []) => {
  useEffect(() => {
    let handle = setTimeout(fn.bind(null, args), ms);

    return () => {
      // if args change then clear timeout
      clearTimeout(handle);
    }
  }, args);
};

export default useDebounce;
