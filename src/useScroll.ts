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
      let horizontal:'up' | 'down' | 'none' = 'none',
          vertical:'left' | 'right' | 'none' = 'none'; 

      if(state.y > ref.current.scrollTop) horizontal = 'down';
      else if(state.y < ref.current.scrollTop) horizontal = 'up';

      if(state.x > ref.current.scrollLeft) vertical = 'left';
      else if(state.x < ref.current.scrollLeft) vertical = 'right';

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
