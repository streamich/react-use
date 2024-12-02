import { useEffect } from 'react';

import useRafState from './useRafState';
import { isBrowser, off, on } from './misc/util';

interface Options {
  initialWidth?: number;
  initialHeight?: number;
  onChange?: (width: number, height: number) => void;
}

const useWindowSize = ({
  initialWidth = Infinity,
  initialHeight = Infinity,
  onChange,
}: Options = {}) => {
  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight,
  });

  useEffect((): (() => void) | void => {
    if (isBrowser) {
      const handler = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        });

        if (onChange) onChange(width, height);
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
