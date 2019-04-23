import { RefObject, useEffect, useMemo, useRef } from 'react';
import useUpdate from './useUpdate';

interface ContentRect {
  height: number;
  width: number;

  top: number;
  left: number;
  right: number;
  bottom: number;

  x: number;
  y: number;
}

declare const ResizeObserver: any;

const useResizeObserver = (ref: RefObject<Element>) => {
  const accessedProperties = useMemo(() => new Set(), []);
  const contentRectRef = useRef<ContentRect>(null);
  const update = useUpdate();

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([{ contentRect }]) => {
      const prevContentRect = contentRectRef.current;
      (contentRectRef as any).current = contentRect;

      if (
        // If we haven't given the contentRect yet
        !prevContentRect ||
        // Or an accessed property has changed between rects
        Array.from(accessedProperties).find(prop => contentRect[prop] !== prevContentRect[prop])
      ) {
        update();
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref.current]);

  // Only force update the component when accessed properties on the rect
  // change (instead of each time any property changes)
  return useMemo(() => {
    return new Proxy((contentRectRef.current || {}) as ContentRect, {
      get(_, prop) {
        accessedProperties.add(prop);
        const rect = contentRectRef.current;
        return rect && prop in rect ? rect[prop] : null;
      },
    });
  }, [contentRectRef.current]);
};

export default useResizeObserver;
