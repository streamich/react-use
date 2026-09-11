import { RefObject, useMemo, useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { isBrowser, noop } from './misc/util';

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'
>;
export type UseMeasureRef<E extends Element = Element> = (element: E) => void;
export type UseMeasureResult<E extends Element = Element> = [UseMeasureRef<E>, UseMeasureRect];
export interface UseMeasureOptions<E extends Element = Element> {
  /**
   * An optional external ref of the element to measure. When provided, the
   * hook observes `ref.current` instead of the element assigned to the
   * callback ref it returns.
   */
  ref?: RefObject<E>;
}

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

function useMeasure<E extends Element = Element>(
  options?: UseMeasureOptions<E>
): UseMeasureResult<E> {
  const [element, ref] = useState<E | null>(null);
  const [rect, setRect] = useState<UseMeasureRect>(defaultState);
  const externalRef = options ? options.ref : undefined;

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
    const target = externalRef ? externalRef.current : element;
    if (!target) return;
    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [element, externalRef, externalRef && externalRef.current]);

  return [ref, rect];
}

export default isBrowser && typeof (window as any).ResizeObserver !== 'undefined'
  ? useMeasure
  : ((() => [noop, defaultState]) as typeof useMeasure);
