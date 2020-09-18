import { useMemo } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import useRafState from './useRafState';
import { isClient } from './util';

const useBodySize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: isClient ? document.body.clientWidth : initialWidth,
    height: isClient ? document.body.clientHeight : initialHeight,
  });

  const observer = useMemo(
    () =>
      new (window as any).ResizeObserver((entries) => {
        if (entries[0]) {
          const { width, height } = entries[0].contentRect;
          setState({ width, height });
        }
      }),
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (!isClient) return;
    observer.observe(document.body);
    return () => {
      observer.disconnect();
    };
  }, [document.body]);

  return state;
};

export default useBodySize;
