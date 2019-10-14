import { useEffect, useRef, RefObject } from 'react';

import { isClient, off, on } from './util';
import useMountedState from './useMountedState';
import useSetState from './useSetState';

export interface State {
  isSliding: boolean;
  value: number;
  pos: number;
  length: number;
}

const REVERSE = false;
// const ONSCRUB = undefined;
// const ONSCRUBSTART = undefined;
// const ONSCRUBSTOP = undefined
// const NOOP = () => {};

export interface Options {
  onScrub: (event: Event) => void;
  reverse: boolean;
}

const useSlider = (ref: RefObject<Element>): State => {
  const isMounted = useMountedState();
  const isSliding = useRef(false);
  const frame = useRef(0);
  const [state, setState] = useSetState<State>({
    isSliding: false,
    value: 0,
    pos: 0,
    length: 0,
  });

  useEffect(() => {
    if (isClient) {
      const startScrubbing = () => {
        if (!isSliding.current && isMounted()) {
          // (ONSCRUBSTART || NOOP)();
          isSliding.current = true;
          setState({ isSliding: true });
          bindEvents();
        }
      };

      const stopScrubbing = () => {
        if (isSliding.current && isMounted()) {
          // (ONSCRUBSTOP || NOOP)();
          isSliding.current = false;
          setState({ isSliding: false });
          unbindEvents();
        }
      };

      const onMouseDown = (event: MouseEvent) => {
        startScrubbing();
        onMouseMove(event);
      };
      const onMouseMove = (event: MouseEvent) => onScrub(event.clientX);

      const onTouchStart = (event: TouchEvent) => {
        startScrubbing();
        onTouchMove(event);
      };
      const onTouchMove = (event: TouchEvent) => onScrub(event.changedTouches[0].clientX);

      const bindEvents = () => {
        on(document, 'mousemove', onMouseMove);
        on(document, 'mouseup', stopScrubbing);

        on(document, 'touchmove', onTouchMove);
        on(document, 'touchend', stopScrubbing);
      };

      const unbindEvents = () => {
        off(document, 'mousemove', onMouseMove);
        off(document, 'mouseup', stopScrubbing);

        off(document, 'touchmove', onTouchMove);
        off(document, 'touchend', stopScrubbing);
      };

      const onScrub = (clientX: number) => {
        cancelAnimationFrame(frame.current);

        frame.current = requestAnimationFrame(() => {
          if (!isMounted()) {
            return;
          }

          if (ref.current) {
            const { left: pos, width: length } = ref.current.getBoundingClientRect();

            // Prevent returning 0 when element is hidden by CSS
            if (!length) {
              return;
            }

            let value = (clientX - pos) / length;

            if (value > 1) {
              value = 1;
            } else if (value < 0) {
              value = 0;
            }

            if (REVERSE) {
              value = 1 - value;
            }

            setState({
              value,
              pos: clientX - pos,
              length,
            });
            // (ONSCRUB || NOOP)(value);
          }
        });
      };

      on(document, 'mousedown', onMouseDown);
      on(document, 'touchstart', onTouchStart);

      return () => {
        off(document, 'mousedown', onMouseDown);
        off(document, 'touchstart', onTouchStart);
      };
    } else {
      return undefined;
    }
  }, [ref]);

  return state;
};

export default useSlider;
