import { useEffect } from 'react';
import { isBrowser, off, on } from './misc/util';

import useRafState from './useRafState';

export interface State {
  x: number;
  y: number;
}

const useWindowScroll = (): State => {
  const [state, setState] = useRafState<State>({
    x: isBrowser ? window.pageXOffset : 0,
    y: isBrowser ? window.pageYOffset : 0,
  });

  useEffect(() => {
    const handler = () => {
      setState({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    };

    on(window, 'scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      off(window, 'scroll', handler);
    };
  }, []);

  return state;
};

export default useWindowScroll;
