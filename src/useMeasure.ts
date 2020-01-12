import { useState, useMemo } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'
>;
export type UseMeasureRef = (element: HTMLElement) => void;
export type UseMeasureResult = [UseMeasureRef, UseMeasureRect];

const defaultState: UseMeasureRect = {
  x: -1,
  y: -1,
  width: -1,
  height: -1,
  top: -1,
  left: -1,
  bottom: -1,
  right: -1,
};

const useMeasure = (): UseMeasureResult => {
  const [element, ref] = useState<HTMLElement | null>(null);
  const [rect, setRect] = useState<UseMeasureRect>(defaultState);

  const observer = useMemo(
    () =>
      new ResizeObserver(entries => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect;
          setRect({ x, y, width, height, top, left, bottom, right });
        }
      }),
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (!element) return;
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element]);

  return [ref, rect];
};

export default useMeasure;
