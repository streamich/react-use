import { RefObject, useEffect } from 'react';
import { off, on } from './util';

const defaultEvents = ['mousedown', 'touchstart'];

const useClickAway = (
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: KeyboardEvent) => void,
  events: string[] = defaultEvents
) => {
  useEffect(() => {
    const handler = event => {
      const { current: el } = ref;
      el && !el.contains(event.target) && onClickAway(event);
    };
    for (const eventName of events) {
      on(document, eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        off(document, eventName, handler);
      }
    };
  });
};

export default useClickAway;
