import { useMemo, useState } from 'react';
import { isBrowser, noop } from './misc/util';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'
>;
export type UseMeasureRef<E extends Element = Element> = (element: E) => void;
export type UseMeasureResult<E extends Element = Element> = [
  UseMeasureRef<E>,
  UseMeasureRect,
  E | null
];
type UseMeasureParams = {
  // @ts-ignore [ResizeObserverOptions is not defined in resize-observer-polyfill]
  observerOptions?: ResizeObserverOptions;
};

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

function useMeasure<E extends Element = Element>(params?: UseMeasureParams): UseMeasureResult<E> {
  const { observerOptions } = { ...params };
  const [element, ref] = useState<E | null>(null);
  const [rect, setRect] = useState<UseMeasureRect>(defaultState);

  const observer = useMemo(
    () =>
      new (window as any).ResizeObserver((entries) => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect;
          setRect({ x, y, width, height, top, left, bottom, right });
        }
      }),
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (!element) return;
    observer.observe(element, observerOptions);
    return () => {
      observer.disconnect();
    };
  }, [element]);

  return [ref, rect, element];
}

export default isBrowser && typeof (window as any).ResizeObserver !== 'undefined'
  ? useMeasure
  : ((() => [noop, defaultState, null]) as typeof useMeasure);
