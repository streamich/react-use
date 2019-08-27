import useUpdateEffect from './useUpdateEffect';

const useDebounce = (fn, ms, args = []) => {
  let handle;
  let canFlush = false;

  function execute() {
    fn.call(null, args);
    canFlush = false;
  }

  function clear() {
    clearTimeout(handle);
    canFlush = false;
  }

  function flush() {
    if (canFlush) {
      clearTimeout(handle);
      execute();
    }
  }

  useUpdateEffect(() => {
    canFlush = true;
    handle = setTimeout(execute, ms);

    return () => {
      // if args change then clear timeout
      clearTimeout(handle);
    };
  }, args);

  return { clear, flush };
};

export default useDebounce;
