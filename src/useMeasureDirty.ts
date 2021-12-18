import { RefObject, useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export interface ContentRect {
  width: number;
  height: number;
  top: number;
  right: number;
  left: number;
  bottom: number;
}

const useMeasureDirty = (ref: RefObject<HTMLElement>): ContentRect => {
  const frame = useRef(0);
  const [rect, set] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });

  const [observer] = useState(
    () =>
      new ResizeObserver((entries) => {
        const entry = entries[0];

        if (entry) {
          cancelAnimationFrame(frame.current);

          frame.current = requestAnimationFrame(() => {
            if (ref.current) {
              set(entry.contentRect);
            }
          });
        }
      })
  );

  useEffect(() => {
    observer.disconnect();

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  return rect;
};

export default useMeasureDirty;
