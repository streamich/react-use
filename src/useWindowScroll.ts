import { useEffect, useRef, useState } from 'react';
import { isClient } from './util';

export interface State {
  x: number;
  y: number;
}

const useWindowScroll = (): State => {
  const frame = useRef(0);
  const [state, setState] = useState<State>({
    x: isClient ? window.scrollX : 0,
    y: isClient ? window.scrollY : 0,
  });

  useEffect(() => {
    const handler = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setState({
          x: window.scrollX,
          y: window.scrollY,
        });
      });
    };

    window.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return state;
};

export default useWindowScroll;
