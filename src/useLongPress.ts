import { useCallback, useRef } from 'react';

const isTouchEvent = (event: Event): event is TouchEvent => {
  return 'touches' in event;
};

const preventDefault = (event: Event) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

const useLongPress = (callback: (e: TouchEvent | MouseEvent) => void, delay: number = 300) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const target = useRef<EventTarget>();

  const start = useCallback(
    (event: TouchEvent | MouseEvent) => {
      // prevent ghost click on mobile devices
      if (event.target) {
        target.current = event.target;
        event.target.addEventListener('touchend', preventDefault, { passive: false });
      }

      timeout.current = setTimeout(() => callback(event), delay);
    },
    [callback, delay]
  );

  const clear = useCallback(() => {
    // clearTimeout and removeEventListener
    timeout.current && clearTimeout(timeout.current);

    target.current && target.current.removeEventListener('touchend', preventDefault);
  }, []);

  return {
    onMouseDown: (e: any) => start(e),
    onTouchStart: (e: any) => start(e),
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
  } as const;
};

export default useLongPress;
