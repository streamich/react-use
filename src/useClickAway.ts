import { RefObject, useEffect, useRef } from 'react';
import { off, on } from './util';

const defaultEvents = ['mousedown', 'touchstart'];

const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  onClickAway: (event: E) => void,
  events: string[] = defaultEvents
) => {
  const savedCallback = useRef(onClickAway);
  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);
  useEffect(() => {
    const refArray = Array.isArray(ref) ? ref : [ref];

    const handler = event => {
      let clickedAway = true;

      refArray.forEach(ref => {
        const { current: el } = ref;
        if (el && el.contains(event.target)) {
          clickedAway = false;
        }
      });

      if (clickedAway) {
        savedCallback.current(event);
      }
    };
    for (const eventName of events) {
      on(document, eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        off(document, eventName, handler);
      }
    };
  }, [events, ref]);
};

export default useClickAway;
