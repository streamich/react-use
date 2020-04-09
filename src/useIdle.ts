import { useEffect, useState } from 'react';
import { throttle } from 'throttle-debounce';
import { off, on } from './util';

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
const oneMinute = 60e3;

// Make sure hook won't break when using SSR
const isBrowser = (typeof window === 'undefined' ? 'undefined' : typeof window) === 'object'
const documentElement = isBrowser ? document : {}
const windowElement = isBrowser ? window : {}

const useIdle = (ms: number = oneMinute, initialState = false, events: string[] = defaultEvents): boolean => {
  const [state, setState] = useState<boolean>(initialState);

  useEffect(() => {
    let mounted = true;
    let timeout: any;
    let localState: boolean = state;
    const set = (newState: boolean) => {
      if (mounted) {
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
      if (isBrowser && !document.hidden) {
        onEvent();
      }
    };

    for (let i = 0; i < events.length; i++) {
      on(windowElement, events[i], onEvent);
    }
    on(documentElement, 'visibilitychange', onVisibility);

    timeout = setTimeout(() => set(true), ms);

    return () => {
      mounted = false;

      for (let i = 0; i < events.length; i++) {
        off(windowElement, events[i], onEvent);
      }
      off(documentElement, 'visibilitychange', onVisibility);
    };
  }, [ms, events, state]);

  return state;
};

export default useIdle;
