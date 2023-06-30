import { useRef, useState, MutableRefObject } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { isBrowser } from './misc/util';

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'
>;
export type UseMeasureRef<E extends Element = Element> = MutableRefObject<E | null>;
export type UseMeasureResult<E extends Element = Element> = [UseMeasureRef<E>, UseMeasureRect];

const defaultRef = { current: null };
const defaultState: UseMeasureRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

function useMeasure<E extends Element = Element>(): UseMeasureResult<E> {
  const ref = useRef<E | null>(null);
  const [rect, setRect] = useState<UseMeasureRect>(defaultState);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new (window as any).ResizeObserver((entries) => {
      if (entries[0]) {
        const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect;
        setRect({ x, y, width, height, top, left, bottom, right });
      }
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, rect];
}

export default isBrowser && typeof (window as any).ResizeObserver !== 'undefined'
  ? useMeasure
  : ((() => [defaultRef, defaultState]) as typeof useMeasure);
