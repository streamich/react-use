import { useEffect } from 'react';

import useRafState from './useRafState';
import { isBrowser, off, on } from './misc/util';

const useBodyScrollSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: isBrowser ? document.body.scrollWidth : initialWidth,
    height: isBrowser ? document.body.scrollHeight : initialHeight,
  });


  useEffect((): (() => void) | void => {
    if (isBrowser) {
      const handler = () => {
        setState({
          width: document.body.scrollWidth,
          height: document.body.scrollHeight,
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

export default useBodyScrollSize;
