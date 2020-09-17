import { useState, useMemo, MutableRefObject, useEffect } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { isClient } from './util';

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'
>;
export type UseMeasureRef<E extends HTMLElement = HTMLElement> = (element: E) => void;
export type UseMeasureResult<E extends HTMLElement = HTMLElement> = [UseMeasureRef<E>, UseMeasureRect];

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

function useMeasure<E extends HTMLElement = HTMLElement>(): UseMeasureResult<E>;
function useMeasure<E extends HTMLElement = HTMLElement>(ref: MutableRefObject<E>): UseMeasureRect;
function useMeasure<E extends HTMLElement = HTMLElement>(ref?: MutableRefObject<E>): any {
  const [element, setElement] = useState<E | null>(null);
  const [rect, setRect] = useState<UseMeasureRect>(defaultState);

  useEffect(() => {
    if (ref) {
      setElement(ref.current);
    }
  }, [ref]);

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
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element]);

  // We don't need to return element setter in case we pass ref as an argument
  if (ref) {
    return rect;
  }

  return [setElement, rect];
}

const useMeasureMock = () => [() => {}, defaultState];

export default isClient && !!(window as any).ResizeObserver ? useMeasure : (useMeasureMock as typeof useMeasure);
