import { useEffect } from 'react';

import useRafState from './useRafState';
import { isBrowser, off, on } from './misc/util';

const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight,
  });

  useEffect((): (() => void) | void => {
    if (isBrowser) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      on(window, 'resize', handler);

      return () => {
        off(window, 'resize', handler);
      };
    }
  }, []);

  return state;
};

export default useWindowSize;
