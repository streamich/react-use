import {RefObject, useEffect} from 'react';
import {on, off} from './util';

const useClickAway = (ref: RefObject<HTMLElement | null>, onClickAway: () => void) => {
  useEffect(() => {
    const handler = (event) => {
      const {current: el} = ref;
      el && !el.contains(event.target) && onClickAway();
    };
    on(document, 'click', handler);
    return () => {
      off(document, 'click', handler);
    };
  });
};

export default useClickAway;
