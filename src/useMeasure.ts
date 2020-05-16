import { useState, useMemo } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'
>;
export type UseMeasureRef = (element: HTMLElement) => void;
export type UseMeasureResult = [UseMeasureRef, UseMeasureRect];

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

const useMeasure = (): UseMeasureResult => {
  const [element, ref] = useState<HTMLElement | null>(null);
  const [rect, setRect] = useState<UseMeasureRect>(defaultState);

  const observer = useMemo(
    () =>
      new (window as any).ResizeObserver(entries => {
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

const useMeasureMock = () => [() => {}, defaultState];

export default !!(window as any).ResizeObserver ? useMeasure : useMeasureMock;
