import { useEffect, useRef, RefObject, CSSProperties } from 'react';

import { isClient, off, on } from './util';
import useMountedState from './useMountedState';
import useSetState from './useSetState';

export interface State {
  isSliding: boolean;
  value: number;
}

export interface Options {
  onScrub: (value: number) => void;
  onScrubStart: () => void;
  onScrubStop: () => void;
  reverse: boolean;
  styles: boolean | CSSProperties;
}

const noop = () => {};

const useSlider = (ref: RefObject<HTMLElement>, options: Partial<Options> = {}): State => {
  const isMounted = useMountedState();
  const isSliding = useRef(false);
  const frame = useRef(0);
  const [state, setState] = useSetState<State>({
    isSliding: false,
    value: 0,
  });

  useEffect(() => {
    if (isClient) {
      const styles = options.styles === undefined ? true : options.styles;
      const reverse = options.reverse === undefined ? false : options.reverse;

      if (ref.current && styles) {
        ref.current.style.userSelect = 'none';
      }

      const startScrubbing = () => {
        if (!isSliding.current && isMounted()) {
          (options.onScrubStart || noop)();
          isSliding.current = true;
          setState({ isSliding: true });
          bindEvents();
        }
      };

      const stopScrubbing = () => {
        if (isSliding.current && isMounted()) {
          (options.onScrubStop || noop)();
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
          if (isMounted() && ref.current) {
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

            if (reverse) {
              value = 1 - value;
            }

            setState({
              value,
            });

            (options.onScrub || noop)(value);
          }
        });
      };

      on(ref.current, 'mousedown', onMouseDown);
      on(ref.current, 'touchstart', onTouchStart);

      return () => {
        off(ref.current, 'mousedown', onMouseDown);
        off(ref.current, 'touchstart', onTouchStart);
      };
    } else {
      return undefined;
    }
  }, [ref]);

  return state;
};

export default useSlider;
