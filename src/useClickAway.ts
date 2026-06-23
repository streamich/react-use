import { RefObject, useEffect, useRef } from 'react';
import { off, on } from './misc/util';

const defaultEvents = ['mousedown', 'touchstart'];

const useClickAway = <E extends Event = Event>(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  onClickAway: (event: E) => void,
  events: string[] = defaultEvents
) => {
  const savedCallback = useRef(onClickAway);

  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handler = (event) => {
      const refArray = Array.isArray(refs) ? refs : [refs];
      const existingRefs = refArray.filter((ref) => Boolean(ref?.current)); // Filter out null refs
      if (existingRefs.every(ref => ref.current && !ref.current.contains(event.target))) {
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
  }, [events, refs]);
};

export default useClickAway;