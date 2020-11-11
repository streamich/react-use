import { RefObject, useEffect } from 'react';

import useRafState from './useRafState';

export interface State {
  x: number;
  y: number;
  direction: {
    horizontal: 'up' | 'down' | 'none';
    vertical: 'left' | 'right' | 'none';
  }
}

const useScroll = (ref: RefObject<HTMLElement>): State => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
      console.error('`useScroll` expects a single ref argument.');
    }
  }

  const [state, setState] = useRafState<State>({
    x: 0,
    y: 0,
    direction: {
      horizontal: 'none',
      vertical: 'none'
    }
    
  });

  useEffect(() => {
    const handler = () => {
      const horizontal = state.y > ref.current.scrollTop ? 'down' : 'up';
      const vertical = state.x > ref.current.scrollLeft ? 'left' : 'right'; 

      if (ref.current) {
        setState({
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop,
          direction: {
            horizontal, vertical
          }
        });
      }
    };

    if (ref.current) {
      ref.current.addEventListener('scroll', handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('scroll', handler);
      }
    };
  }, [ref]);

  return state;
};

export default useScroll;
