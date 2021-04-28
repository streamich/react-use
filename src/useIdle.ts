import { useEffect, useState } from 'react';
import { throttle } from 'throttle-debounce';
import useMountedState from './useMountedState';
import { off, on } from './misc/util';

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
const oneMinute = 60e3;

const useIdle = (
  ms: number = oneMinute,
  initialState: boolean = false,
  events: string[] = defaultEvents
): boolean => {
  const [state, setState] = useState<boolean>(initialState);
  const isMounted = useMountedState();

  useEffect(() => {
    let timeout: any;
    let localState: boolean = state;
    const set = (newState: boolean) => {
      if (isMounted()) {
        localState = newState;
        setState(newState);
      }
    };

    const onEvent = throttle(50, () => {
      if (localState) {
        set(false);
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => set(true), ms);
    });
    const onVisibility = () => {
      if (!document.hidden) {
        onEvent();
      }
    };

    for (let i = 0; i < events.length; i++) {
      on(window, events[i], onEvent);
    }
    on(document, 'visibilitychange', onVisibility);

    timeout = setTimeout(() => set(true), ms);

    return () => {
      for (let i = 0; i < events.length; i++) {
        off(window, events[i], onEvent);
      }
      off(document, 'visibilitychange', onVisibility);
    };
  }, [ms, events]);

  return state;
};

export default useIdle;
