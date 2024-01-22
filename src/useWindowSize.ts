import { useEffect } from 'react';

import useRafState from './useRafState';
import { isBrowser, off, on } from './misc/util';

export interface Size {
  height: number;
  width: number;
}

export interface Options {
  initialWidth?: number;
  initialHeight?: number;
  onChange?: (size: Size) => void;
}

const useWindowSize = (options?: Options) => {
  const { initialHeight = Infinity, initialWidth = Infinity, onChange } = options || {};

  const [state, setState] = useRafState<Size>({
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight,
  });

  useEffect((): (() => void) | void => {
    if (isBrowser) {
      const handler = () => {
        setState(() => {
          const size = { width: window.innerWidth, height: window.innerHeight };

          if (onChange) {
            onChange(size);
          }

          return size;
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
