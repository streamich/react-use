import { useEffect } from 'react';

import useRafState from './useRafState';
import { isBrowser, off, on } from './misc/util';

const useDevicePixelRatio = (initialRatio = 1) => {
  const [state, setState] = useRafState<number>(initialRatio);

  useEffect((): (() => void) | void => {
    if (isBrowser) {
      const handler = () => {
        setState(window.devicePixelRatio);
      };

      on(window, 'resize', handler);

      return () => {
        off(window, 'resize', handler);
      };
    }
  }, []);

  return state;
};

export default useDevicePixelRatio;
