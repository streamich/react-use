import { useEffect, useState } from 'react';
import { off, on } from './misc/util';

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

  useEffect(() => {
    const screen = window.screen;
    let mounted = true;

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
  }, []);

  return state;
};

export default useOrientation;
