import { useUpdateEffect } from '..';

const useDebounce = (fn: () => any, ms: number = 0, args: any[] = []) => {
  useUpdateEffect(() => {
    const handle = setTimeout(fn.bind(null, args), ms);

    return () => {
      // if args change then clear timeout
      clearTimeout(handle);
    };
  }, args);
};

export default useDebounce;
