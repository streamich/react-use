import { useEffect, useState } from 'react';
import { off, on, isClient } from './util';

export interface OrientationState {
  angle: number;
  type: string;
}

const defaultState: OrientationState = {
  angle: 0,
  type: 'landscape-primary',
};

const useOrientation = (initialState: OrientationState = defaultState) => {
  const [state, setState] = useState(initialState);

  useEffect((): (() => void) | void => {
    if (isClient) {
      let mounted = true;
      const screen = window.screen;

      const onChange = () => {
        if (mounted) {
          const { orientation } = screen as any;

          if (orientation) {
            const { angle, type } = orientation;
            setState({ angle, type });
          } else if (window.orientation !== undefined) {
            setState({
              angle: typeof window.orientation === 'number' ? window.orientation : 0,
              type: '',
            });
          } else {
            setState(initialState);
          }
        }
      };
  
      on(window, 'orientationchange', onChange);
      onChange();
  
      return () => {
        mounted = false;
        off(window, 'orientationchange', onChange);
      };
    }
  }, []);

  return state;
};

export default useOrientation;
