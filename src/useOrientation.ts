import { useState, useEffect } from 'react';
import useMountedState from './useMountedState';
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
  const isMounted = useMountedState();

  useEffect(() => {
    const screen = window.screen;

    const onChange = () => {
      if (isMounted()) {
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
      off(window, 'orientationchange', onChange);
    };
  }, []);

  return state;
};

export default useOrientation;
